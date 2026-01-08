import UpcomingTours from "./upcoming-tours";
import RecentActivityComp from "./recent-activity";
import TourModel from "@/lib/database/Model/Tour";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";
import { notFound } from "next/navigation";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";

const UpcomingToursAndRecentActivity = async () => {
  try {
    await connectDB();

    const tokenData = await getTokenData("token");

    if (!tokenData) {
      console.log(
        "getTokenData() has bugs, check it in helper function. Error at upcoming-tour page of guide"
      );
      return notFound();
    }

    const { id } = tokenData;
    console.log(id);

    const guide = await GuideModel.findOne({ guideId: id });
    if (!guide) throw new Error("Guide not found");
    const tour = await TourModel.find({ "guide.id": guide._id.toString() });

    if (!tour) {
      notFound();
    }

    const serializedTour = JSON.parse(JSON.stringify(tour));
    console.log("upcoming tour: ", serializedTour);

    return (
      <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
        <UpcomingTours serializedTour={serializedTour} />
        <RecentActivityComp serializedTour={serializedTour} />
      </div>
    );
  } catch (error) {
    throw new Error(
      "Failed to fetch upcoming-tour data in UpcomingToursAndRecentActivity component from database"
    );
  }
};

export default UpcomingToursAndRecentActivity;
