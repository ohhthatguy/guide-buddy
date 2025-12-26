import { NextRequest, NextResponse } from "next/server";
import GuideModel from "@/lib/database/Model/Guide";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/database/database";

await connectDB();

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      throw new Error("Authentication token missing");
    }
    const tokenData = jwt.verify(token || "", process.env.JWT_SECRET!) as {
      id: string;
      name: string;
    };

    console.log("Data inside cookie in guide dashboard: ", tokenData);

    const GuideData = await GuideModel.findOne({ guideId: tokenData.id });

    console.log(GuideData);

    return NextResponse.json({
      msg: "data is taken from GuideModel in dashbaord guide",
      data: { name: tokenData.name, GuideData },
    });
  } catch (error) {
    console.log("Error in backend dashboard of guide: ", error);
    return NextResponse.json(
      {
        msg: "Error in backend dashboard of guide:",
        err: error,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { isOnline } = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    console.log("PAtch req body: ", isOnline);

    if (!token)
      return NextResponse.json(
        { msg: "Unauthorized token in updating the visibility of guide" },
        { status: 401 }
      );

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    // Use findOneAndUpdate because you're searching by 'guideId' (the Account ID)
    const updatedGuide = await GuideModel.findOneAndUpdate(
      { guideId: decoded.id },
      { available: !isOnline },
      { new: true } // returns the updated document
    );

    return NextResponse.json({
      msg: `Status updated to ${isOnline ? "Online" : "Offline"}`,
      data: updatedGuide,
    });
  } catch (error) {
    return NextResponse.json({ msg: "Update failed", error }, { status: 500 });
  }
}
