import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/database";
import ReviewModel from "@/lib/database/Model/Review";
import GuideModel from "@/lib/database/Model/Guide";
import { paginationWithoutSkip } from "@/lib/helper/pagination";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const reqBody = await req.json();

    console.log("Review data: ", reqBody);

    //save review
    const newReview = new ReviewModel(reqBody);
    const savedReview = await newReview.save({ session });

    if (!savedReview) {
      return NextResponse.json(
        {
          msg: "Problem is in saving the reveiew. comes empty: ",
          savedReview,
        },
        { status: 500 }
      );
    }

    //save the review stats to guide
    const data = await ReviewModel.find({ guideId: reqBody.guideId }).session(
      session
    );

    console.log("REVIEW DTA: ", data);

    if (!data || data.length == 0) {
      await session.abortTransaction();
    } else {
      const totalRatingScore = data.reduce((count, e) => count + e.rating, 0);
      console.log("TOTAL RATING: ", totalRatingScore);

      const averageRating = Math.floor(
        data.length > 0 ? totalRatingScore / data.length : 0
      );

      console.log("avg RATING: ", averageRating);

      const settingRating = await GuideModel.findByIdAndUpdate(
        reqBody.guideId,
        {
          rating: averageRating,
        },
        { session, new: true }
      );

      console.log("settingRating: ", settingRating);
    }

    await session.commitTransaction();
    return NextResponse.json(
      {
        msg: "Succesfully saved REVIEW: ",
        savedReview,
      },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();

    console.log("ERROR IN posting REVIEW: ", error);
    return NextResponse.json(
      {
        msg: "ERROR IN posting REVIEW: ",
        error,
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const guideId = searchParams.get("guideId");
    const page = searchParams.get("page");

    console.log("guideID of review: ", guideId);
    console.log("page of review: ", page);

    const totalDataToSend = paginationWithoutSkip(Number(page));

    // const data = await ReviewModel.find({ guideId }).lean();
    const totalReviewCount = await ReviewModel.countDocuments({ guideId });
    console.log(
      "toal count  of review of this certain guide: ",
      totalReviewCount
    );

    const data = await ReviewModel.find({ guideId })
      .populate({
        path: "clientId",
        populate: {
          path: "clientId",
          model: "Account",
          select: "name",
        },
      })
      .limit(totalDataToSend);
    // console.log("data", data);

    if (!data) {
      return NextResponse.json(
        {
          msg: "Problem is in getting the reveiew. comes empty: ",
          data,
        },
        { status: 500 }
      );
    }

    const finalData = data.map((e) => {
      return {
        _id: e._id,
        rating: e.rating,
        comment: e.comment,
        date: e.date,
        guideId: e.guideId,
        clientId: e.clientId._id,
        clientName: e.clientId.clientId.name,
      };
    });

    // console.log("FINAL DATA", finalData);

    return NextResponse.json(
      {
        msg: "Succesfully get REVIEW: ",
        finalData,
        totalReviewCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR IN gettig REVIEW: ", error);
    return NextResponse.json(
      {
        msg: "ERROR IN getting REVIEW: ",
        error,
      },
      { status: 500 }
    );
  }
}
