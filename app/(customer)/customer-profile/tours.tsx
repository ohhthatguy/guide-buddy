import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { Calendar, Clock, MapPin, Eye } from "lucide-react";
// import { GuideDetails } from "./GuideDetails";
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
    <div className="  comp-bg rounded-2xl my-2 ">
      <div className="mx-4  my-2">
        <h4>My Tours</h4>
        {/* <p>Your scheduled tours for the next few days: </p> */}
      </div>

      <div className=" overflow-auto px-2 rounded-2xl h-[53vh] ">
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
                <div className="grid grid-cols-[5%_95%] p-4  gap-6 mb-4 rounded-md ele-bg ">
                  <div>
                    <Calendar size={44} className="p-2 rounded-md comp-bg" />
                  </div>

                  <div className="grid gap-1 px-4 ">
                    <div className="flex justify-between ">
                      <div className=" leading-tight">
                        <div className="font-semibold">{e.location}</div>

                        <div className="text-[clamp(0.8rem,0.3vw+0.01rem,2rem)] ">
                          {e.client.name}
                        </div>
                      </div>
                      <div className="font-medium flex gap-2">
                        <span>{e.price}</span>
                        <Link
                          href={`/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&clientName=${e.client.name}&clientId=${e.client.id}&tourID=${e._id}`}
                          className="grid grid-cols-[5%_95%] rounded-md ele-bg hover:cursor-pointer  hover:text-green-800 shadow-xs hover:scale-[1.1] scale-100 transition-all duration-500"
                        >
                          <Eye />
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 my-2 ">
                      <div className="">
                        <Link
                          href={`/guide-profile/${e.guide.id}?tourId=${e._id}&date=${e.date}&startTime=${e.time.startTime}&endTime=${e.time.endTime}&location=${e.location}&duration=${e.duration}&meetup=${e.meetup_location.coordinates}&page=1`}
                          className="hover:cursor-pointer hover:text-white hover:bg-black"
                        >
                          Guide: {e.guide.name}
                        </Link>
                      </div>

                      <div className="sm:flex gap-8 sm:justify-between  ">
                        <div className="flex flex-wrap gap-2 sm:flex-1 justify-between sm:justify-start sm:gap-4">
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

                        <div
                          className={` rounded-xl text-sm p-1 text-center  flex justify-center items-center`}
                        >
                          <div
                            className={` rounded-xl w-full sm:w-44 ${
                              e.status == "ACCEPTED"
                                ? "bg-green-500"
                                : e.status == "PENDING"
                                  ? "bg-amber-400"
                                  : "bg-red-500"
                            }`}
                          >
                            {" "}
                            {e.status}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex justify-between items-center border border-red-500">
                      <div className="border">
                        <div>
                          <div>{e.client.name}</div>

                          <Link
                            href={`/guide-profile/${e.guide.id}?tourId=${e._id}&date=${e.date}&startTime=${e.time.startTime}&endTime=${e.time.endTime}&location=${e.location}&duration=${e.duration}&meetup=${e.meetup_location.coordinates}&page=1`}
                            className="hover:cursor-pointer hover:text-white hover:bg-black"
                          >
                            Guide: {e.guide.name}
                          </Link>
                        </div>
                        <div className="flex gap-4 border border-red-500 flex-col sm:flex-row">
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

                    
                      <div className="flex gap-4 items-center border">
                        <Link
                          href={`/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&clientName=${e.client.name}&clientId=${e.client.id}&tourID=${e._id}`}
                          className="grid grid-cols-[5%_95%] rounded-md ele-bg hover:cursor-pointer  hover:text-green-800 shadow-xs hover:scale-[1.1] scale-100 transition-all duration-500"
                        >
                          <Eye />
                        </Link>

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
                    </div> */}
                  {/* </div> */}
                </div>
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
