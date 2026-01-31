import { NextResponse, NextRequest } from "next/server";
import GuideModel from "@/lib/database/Model/Guide";
import AccountModel from "@/lib/database/Model/Account";
import connectDB from "@/lib/database/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

await connectDB();

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const reqBody = await req.json();
    const cookieStore = await cookies();

    const AccountToken = cookieStore.get("token")?.value;
    if (!AccountToken) {
      throw new Error("Authentication token missing");
    }
    const AccountData = jwt.verify(
      AccountToken || "",
      process.env.JWT_SECRET!,
    ) as { id: string };

    console.log(reqBody);
    const newGuide = new GuideModel({
      ...reqBody,
      guideId: AccountData.id,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(reqBody.location[1]),
          parseFloat(reqBody.location[0]),
        ], // MUST BE [Long, Lat]
      },
    });

    const savedGuide = await newGuide.save({ session });
    const updatedIsFirstTimeFlag = await AccountModel.findByIdAndUpdate(
      AccountData.id,
      { isFirstTime: false },
      { session },
    );

    await session.commitTransaction();
    return NextResponse.json(
      {
        msg: "succefully saved remaiing guide data and isFirstTime updated to false",
        data: { AccountData, reqBody, savedGuide, updatedIsFirstTimeFlag },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error at backend of first_time_login guide: ", error);
    await session.abortTransaction();
    return NextResponse.json(
      { msg: "Error at backend of first_time_login guide", err: error },
      { status: 500 },
    );
  } finally {
    session.endSession();
  }
}
