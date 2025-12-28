import { NextResponse } from "next/server";
import connectDB from "@/lib/database/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import GuideModel from "@/lib/database/Model/Guide";
await connectDB();

export async function GET() {
  try {
    const isOnline = true; //set this to false. I have set it to true for testing!!!
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

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
      { available: isOnline },
      { new: true } // returns the updated document
    );

    const response = await NextResponse.json(
      {
        msg: `LoggedOut Succefully & visibility of guide is changed to false & token is delted too`,
        data: updatedGuide,
      },
      { status: 200 }
    );

    response.cookies.delete("token");
    return response;
  } catch (err) {
    console.log("Error in login out: ", err);
    return NextResponse.json({
      message: "Logout Failed!",
      status: 500,
      err,
    });
  }
}
