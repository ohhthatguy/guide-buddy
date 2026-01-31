import { NextResponse, NextRequest } from "next/server";
import ReviewModel from "@/lib/database/Model/Review";
import connectDB from "@/lib/database/database";
import { paginationWithoutSkip } from "@/lib/helper/pagination";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";
import TourModel from "@/lib/database/Model/Tour";
import GuideModel from "@/lib/database/Model/Guide";
import { RecentActivity } from "@/app/(guide)/dashboard/type/type";
import { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { useGetTimingMessage } from "@/lib/helper/useGetTimingMessage";

const getUpcomingTourData = async (pagLimit: number) => {
  try {
    const tokenData = await getTokenData("token");

    if (!tokenData) {
      console.log(
        "getTokenData() has bugs, check it in helper function. Error at upcoming-tour page of guide",
      );
      throw new Error(
        "Failed to get token data in UpcomingToursAndRecentActivity component ",
      );
    }

    const { id } = tokenData;
    console.log(id);

    const TourItemCount = await TourModel.countDocuments({});
    console.log("YOUR ITEM COUNT: ", TourItemCount);

    const guide = await GuideModel.findOne({ guideId: id });
    if (!guide) throw new Error("Guide not found");
    const tour = await TourModel.find({
      "guide.id": guide._id.toString(),
    }).limit(pagLimit);

    console.log("PAGELIMIT AT UPCMONG: ", pagLimit);

    if (!tour || tour.length === 0) {
      console.log("No tours found for this guide");
      return { serializedTour: [], id };
    }

    let serializedTour = JSON.parse(JSON.stringify(tour));

    console.log("upcoming tour: ", serializedTour);

    return { serializedTour, id, TourItemCount };
  } catch (error) {
    console.log(
      "Failed to fetch upcoming-tour data in UpcomingToursAndRecentActivity component from database",
      error,
    );
    throw new Error(
      "Failed to fetch upcoming-tour data in UpcomingToursAndRecentActivity component from database",
    );
  }
};

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    let recentActivity: RecentActivity[] = [];

    const { searchParams } = new URL(req.url);
    const guideId = searchParams.get("guideId");
    const recentPageNumber = Number(searchParams.get("recentPageNumber"));
    const pagLimit = paginationWithoutSkip(recentPageNumber);

    const {
      serializedTour,
      id,
      TourItemCount = 0,
    } = await getUpcomingTourData(pagLimit);

    const tourActivities: RecentActivity[] = (serializedTour || []).map(
      (e: TourDataType) => ({
        type: "booking",
        message:
          e.status === "PENDING"
            ? `New booking request from ${e.client.name}!`
            : e.status === "REJECTED"
              ? `Booking request of ${e.client.name} Rejected!`
              : `Booking request of ${e.client.name} Accepted!`,
        // FIX: Passing as an object to match your function definition
        time: useGetTimingMessage(e.createdAt),
        id: e._id,
      }),
    );

    const reviewItemCount = await ReviewModel.countDocuments({});

    const dataReview = await ReviewModel.find({
      guideId: guideId,
    })
      .populate({
        path: "clientId",
        model: "Client",
        populate: {
          path: "clientId",
          model: "Account",
          select: "name",
        },
      })
      .limit(pagLimit)
      .lean();

    const data = JSON.parse(JSON.stringify(dataReview));
    console.log(data);
    const reviewActivities: RecentActivity[] = (data || []).map((e: any) => ({
      type: "review",
      message: `New review from ${e.clientId?.clientId?.name || "Anonymous"}!`,
      time: useGetTimingMessage(e.createdAt),
      id: e._id,
    }));

    console.log("REVIEW ITEM COUNT: ", reviewItemCount);
    console.log("Tour ITEM COUNT: ", TourItemCount);

    recentActivity = [...tourActivities, ...reviewActivities];
    const finalData = {
      recentActivity,
      totalDataCount: reviewItemCount + TourItemCount,
    };

    return NextResponse.json(
      {
        msg: "Success IN GETTING THE VALUE OF RECENT ACTIVITY IN BACKEND",
        finalData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(
      "ERROR IN GETTING THE VALUE OF RECENT ACTIVITY IN BACKEND",
      error,
    );
    return NextResponse.json(
      {
        msg: "ERROR IN GETTING THE VALUE OF RECENT ACTIVITY IN BACKEND",
        error,
      },
      { status: 500 },
    );
  }
}
