import { NextRequest, NextResponse } from "next/server";
import TourModel from "@/lib/database/Model/Tour";
import connectDB from "@/lib/database/database";

await connectDB();

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("Req body in patch GUIDE NOTE: ", reqBody);

    const updateQuery = await TourModel.findOneAndUpdate(
      { _id: reqBody.tourID },
      { $set: { guideNote: reqBody.guideNote } },
      { new: true, runValidators: true }
    );

    if (!updateQuery) {
      return NextResponse.json(
        {
          msg: "Error in backend while patching GUIDE NOTE, data came out nothing: ",
          updateQuery,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "Successful while patching GUIDE NOTE: ", updateQuery },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR IN patching the GUIDE NOTE: ", error);
    return NextResponse.json(
      { msg: "Error in backend while patching GUIDE NOTE: ", error },
      { status: 500 }
    );
  }
}
