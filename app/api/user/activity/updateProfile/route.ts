import { NextRequest, NextResponse } from "next/server";

import ClientModel from "@/lib/database/Model/Client";
import connectDB from "@/lib/database/database";

await connectDB();

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const updateQuery = await ClientModel.findOneAndUpdate(
      { _id: reqBody._id },
      { $set: reqBody },
    );

    if (!updateQuery) {
      return NextResponse.json(
        { msg: "error in updating the customer profile" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { msg: "Sucessfully updated the customer profile", reqBody, updateQuery },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in backend while customer profile: ");
    return NextResponse.json(
      { msg: "Error in backend while customer profile: ", error },
      { status: 500 },
    );
  }
}
