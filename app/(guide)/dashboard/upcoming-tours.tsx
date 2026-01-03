import type { TourDataType } from "../guide-profile/type/type";
import { Calendar, Clock, MapPin } from "lucide-react";
import TourModel from "@/lib/database/Model/Tour";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";
import { notFound } from "next/navigation";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";
import BookingStatus from "./BookingStatus";
import Link from "next/link";

const UpcomingTours = async () => {
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

    const guide = await GuideModel.findOne({ guideId: id });
    if (!guide) throw new Error("Guide not found");
    const tour = await TourModel.find({ "guide.id": guide._id.toString() });

    if (!tour) {
      notFound();
    }

    const serializedTour = JSON.parse(JSON.stringify(tour));
    console.log("upcoming tour: ", serializedTour);

    return (
      <div className=" p-4 comp-bg rounded-2xl">
        <div className="mb-4">
          <h4>Upcoming Tours</h4>
          <p>Your scheduled tours for the next few days: </p>
        </div>

        {serializedTour?.length > 0 ? (
          serializedTour.map((e: TourDataType, index: number) => (
            <Link
              href={`/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&tourID=${e._id}&clientName=${e.client.name}`}
              key={index}
              className="grid grid-cols-[5%_95%] p-4  gap-4 mb-4 rounded-md ele-bg hover:cursor-pointer  hover:shadow-md shadow-xs hover:scale-[1.01] scale-100 transition-all duration-500"
            >
              <div>
                <Calendar size={44} className="p-2 rounded-md comp-bg" />
              </div>

              <div className="grid gap-1 px-4">
                <div className="flex justify-between ">
                  <div className="font-semibold">{e.location}</div>
                  <div className="font-medium">{e.price}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <div>
                      <div>{e.client.name}</div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex gap-1 items-center">
                        {" "}
                        <Calendar size={18} />{" "}
                        <div>
                          {e.date} at {e.time.startTime}
                        </div>
                      </div>

                      <div className="flex gap-1 items-center">
                        {" "}
                        <Clock size={18} /> <div>{e.duration} hours</div>
                      </div>

                      <div className="flex gap-1 items-center">
                        {" "}
                        <MapPin size={18} /> <div>{e.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* <BookingStatus e={e} /> */}
                  <div
                    className={`border rounded-xl text-sm p-1 ${
                      e.status == "ACCEPTED"
                        ? "bg-green-500"
                        : e.status == "PENDING"
                        ? "bg-amber-400"
                        : "bg-red-500"
                    }`}
                  >
                    {e.status}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>Opps... there are no tours scheduled for you rn !!</div>
        )}
      </div>
    );
  } catch (err) {
    throw new Error("Failed to fetch upcoming-tour data from database");
  }
};

export default UpcomingTours;
