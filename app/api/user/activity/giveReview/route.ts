import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/database";
import ReviewModel from "@/lib/database/Model/Review";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const reqBody = await req.json();

    console.log("Review data: ", reqBody);

    const newReview = new ReviewModel(reqBody);
    const savedReview = await newReview.save();

    if (!savedReview) {
      return NextResponse.json(
        {
          msg: "Problem is in saving the reveiew. comes empty: ",
          savedReview,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        msg: "Succesfully saved REVIEW: ",
        savedReview,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("ERROR IN posting REVIEW: ", error);
    return NextResponse.json(
      {
        msg: "ERROR IN posting REVIEW: ",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const guideId = searchParams.get("guideId");

    console.log("guideID of review: ", guideId);

    // const data = await ReviewModel.find({ guideId }).lean();
    const data = await ReviewModel.find({ guideId }).populate({
      path: "clientId",
      populate: {
        path: "clientId",
        model: "Account",
        select: "name",
      },
    });
    console.log("data", data);

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

    console.log("FINAL DATA", finalData);

    return NextResponse.json(
      {
        msg: "Succesfully get REVIEW: ",
        finalData,
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
