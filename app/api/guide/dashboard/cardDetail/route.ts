import { NextRequest, NextResponse } from "next/server";
import GuideModel from "@/lib/database/Model/Guide";

import connectDB from "@/lib/database/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

//total earning: tokenData.id lini, Guidemodel ma tyo guideId: tokenData.id find garni, tesko _id lini, tourModel ma guide: tyo aagi ko _id find garni, if status == accepted then duration * price garera sum garni
//tours this month and total tour: tokenData.id lini, Guidemodel ma tyo guideId: tokenData.id find garni, toursComplete for total
//avg rating:  tokenData.id lini, Guidemodel ma tyo guideId: rating
//completion Rate: tokenData.id lini, Guidemodel ma tyo guideId: tokenData.id find garni, tesko _id lini, tourModel ma guide: tyo aagi ko _id find garni, (no of status === accepted) / (no of status ===  accept + reject)

export async function GET(req: NextRequest) {
  await connectDB();

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

    return NextResponse.json({
      msg: "Success in backend dashboard of guide while getting the card detail data",
      data: {},
    });
  } catch (error) {
    console.log(
      "Error in backend dashboard of guide while getting the card detail data: ",
      error
    );
    return NextResponse.json(
      {
        msg: "Error in backend dashboard of guide while getting the card detail data:",
        err: error,
      },
      { status: 500 }
    );
  }
}
