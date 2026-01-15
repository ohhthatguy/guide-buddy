import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { Calendar, Clock, MapPin } from "lucide-react";
import { GuideDetails } from "./GuideDetails";
import Link from "next/link";
import { isFinalPage } from "@/lib/helper/pagination";

const Tours = ({
  tour,
  page,
  TourItemCount,
}: {
  tour: TourDataType[];
  page: string;
  TourItemCount: number;
}) => {
  console.log(tour);

  const createPageURL = () => {
    const pageNumber = Number(page) + 1;

    return `/customer-profile?page=${pageNumber.toString()}`;
  };

  return (
    <div className=" p-4 comp-bg rounded-2xl ">
      <div className="mb-4">
        <h4>My Tours</h4>
        {/* <p>Your scheduled tours for the next few days: </p> */}
      </div>
      <div className=" overflow-auto px-4 h-[53vh] ">
        {tour?.length > 0 ? (
          tour.map((e: TourDataType, index: number) => (
            <div key={index}>
              {!isFinalPage(Number(page), TourItemCount) &&
              tour.length - 1 == index ? (
                <div className=" text-center ">
                  <Link
                    className="text-blue-600 underline"
                    href={createPageURL()}
                  >
                    More
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&clientName=${e.client.name}&clientId=${e.client.id}&tourID=${e._id}`}
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
                          <GuideDetails
                            guideid={e.guide.id}
                            tourid={e._id}
                            date={e.date}
                            startTime={e.time.startTime}
                            endTime={e.time.endTime}
                            location={e.location}
                            duration={e.duration}
                            guideName={e.guide.name}
                            meetup={e.meetup_location.coordinates}
                          />
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

                      {/* <BookingStatus e={e} />  */}
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
              )}
            </div>
          ))
        ) : (
          <div className="text-4xl grid place-items-center h-[53vh] ">
            Opps... there are no tours scheduled for you rn !!
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
