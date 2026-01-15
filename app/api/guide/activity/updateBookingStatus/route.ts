import { NextRequest, NextResponse } from "next/server";
import TourModel from "@/lib/database/Model/Tour";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";
import mongoose from "mongoose";
await connectDB();

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("Reqbody bookingstatus guide: ", reqBody);
    console.log("reqBody._id : ", reqBody._id);
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

export async function PATCH(req: NextRequest) {
  const reqBody = await req.json();

  if (reqBody.status === "ACCEPTED") {
    console.log("HRERE");
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      //upadte the status of the tour
      const updateQuery = await TourModel.findOneAndUpdate(
        { _id: reqBody.tourID },
        { $set: { status: reqBody.status } },
        { session: session, new: true }
        // { new: true }
      );

      console.log("Req body in patch booking staus: ", reqBody);

      if (!updateQuery) {
        await session.abortTransaction();

        return NextResponse.json(
          {
            msg: "Error in backend while patching booking status, data came out nothing: ",
            updateQuery,
          },
          { status: 500 }
        );
      }
      console.log("reqBody.guideId: ", reqBody.guideId);
      const guideObjectId = new mongoose.Types.ObjectId(reqBody.guideId);
      //get all the status count
      const statusCountInGuide = await TourModel.aggregate([
        { $match: { "guide.id": guideObjectId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
      // Output will look like: [{ _id: 'completed', count: 10 }, { _id: 'pending', count: 2 }]

      console.log("statusCountInGuide: ", statusCountInGuide);
      //select the count of one where status is ACCEPTED
      const completedData = statusCountInGuide.find(
        (item) => item._id === "ACCEPTED"
      );
      const completedCount = completedData ? completedData.count : 0;

      console.log("COMEPLETE COUNT: ", completedCount);

      //update the count of guide with newTOur completed count

      const updateCompleteStatusInGuide = await GuideModel.findOneAndUpdate(
        { _id: reqBody.guideId },
        { $set: { toursCompleted: completedCount } },
        { session: session, new: true }
      );

      if (!updateCompleteStatusInGuide) {
        await session.abortTransaction();
        return NextResponse.json(
          {
            msg: "Error in backend while updating the tour completed count: ",
            updateCompleteStatusInGuide,
          },
          { status: 500 }
        );
      }

      await session.commitTransaction();

      return NextResponse.json(
        {
          msg: "Successful while patching booking status: and complete status upafted ",
          updateQuery,
          updateCompleteStatusInGuide,
        },
        { status: 200 }
      );
    } catch (error) {
      await session.abortTransaction();
      console.log(
        "ERROR IN patching the status booking / updating the tour complete count: ",
        error
      );
      return NextResponse.json(
        {
          msg: "Error in backend while patching booking status:  / updating the tour complete count",
          error,
        },
        { status: 500 }
      );
    } finally {
      await session.endSession();
    }
  } else {
    try {
      console.log("Req body in patch booking staus: ", reqBody);

      const updateQuery = await TourModel.findOneAndUpdate(
        { _id: reqBody.tourID },
        { $set: { status: reqBody.status } },
        { new: true }
      );

      if (!updateQuery) {
        return NextResponse.json(
          {
            msg: "Error in backend while patching booking status, data came out nothing: ",
            updateQuery,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { msg: "Successful while patching booking status: ", updateQuery },
        { status: 200 }
      );
    } catch (error) {
      console.log("ERROR IN patching the status booking: ", error);
      return NextResponse.json(
        { msg: "Error in backend while patching booking status: ", error },
        { status: 500 }
      );
    }
  }
}
