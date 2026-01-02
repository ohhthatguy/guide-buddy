import { NextRequest, NextResponse } from "next/server";
import TourModel from "@/lib/database/Model/Tour";
import connectDB from "@/lib/database/database";

await connectDB();

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const updateQuery = await TourModel.findOneAndUpdate(
      { _id: reqBody._id },
      { $set: reqBody }
    );

    if (!updateQuery) {
      return NextResponse.json(
        { msg: "error in updating the booking status" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "Sucessfully updated the booking status", reqBody, updateQuery },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in backend while updating booking status: ");
    return NextResponse.json(
      { msg: "Error in backend while updating booking status: ", error },
      { status: 500 }
    );
  }
}
