import type { TourDataType } from "../guide-profile/type/type";
// import TourModel from "@/lib/database/Model/Tour";
// import GuideModel from "@/lib/database/Model/Guide";
// import connectDB from "@/lib/database/database";
// import { notFound } from "next/navigation";
// import { getTokenData } from "@/lib/helper/useGetDataFromToken";
// import BookingStatus from "./BookingStatus";
// import Link from "next/link";
import UpcomingToursClientComp from "../clientcomp/UpcomingToursClientComp";

const UpcomingTours = async ({
  serializedTour,
  TourItemCount,
}: {
  serializedTour: TourDataType[];
  TourItemCount: number;
}) => {
  try {
    console.log("upcoming tour: ", serializedTour);
    return (
      <div className=" p-4 comp-bg rounded-2xl   ">
        <div className="mb-4">
          <h4>Upcoming Tours</h4>
          <p>Your scheduled tours for the next few days: </p>
        </div>

        <div
          className="overflow-auto px-4 h-[50vh] 
        "
        >
          {serializedTour?.length > 0 ? (
            serializedTour.map((e: TourDataType, index: number) => (
              <UpcomingToursClientComp
                key={index}
                e={e}
                index={index}
                length={serializedTour.length}
                TourItemCount={TourItemCount}
              />
            ))
          ) : (
            <div>Opps... there are no tours scheduled for you rn !!</div>
          )}
        </div>
      </div>
    );
  } catch (err) {
    throw new Error("Failed to fetch upcoming-tour data from database");
  }
};

export default UpcomingTours;
