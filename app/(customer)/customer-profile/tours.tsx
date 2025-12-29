import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { Calendar, Clock, MapPin } from "lucide-react";
import { GuideDetails } from "./GuideDetails";

const Tours = ({ tour }: { tour: TourDataType }) => {
  const upcomingTours: TourDataType[] = [
    {
      id: "asdasd1",
      guide: { id: "4g234g234gs", name: "Michael Chen guide" },

      client: { id: "4g234g234g", name: "Michael Chen customer" },
      date: "Today",
      time: { startTime: "2:00", endTime: "4:00" },
      duration: "3 hours",
      location: "Downtown Districts s",
      price: 120,
      status: "PENDING",
    },
  ];
  console.log(tour);
  const tourData: TourDataType[] = [...upcomingTours, tour];

  return (
    <div className=" p-4 comp-bg rounded-2xl">
      <div className="mb-4">
        <h4>Upcoming Tours</h4>
        <p>Your scheduled tours for the next few days: </p>
      </div>

      {tourData?.length > 0 ? (
        tourData.map((e: TourDataType, index: number) => (
          <div
            key={index}
            className="grid grid-cols-[5%_95%] p-4  gap-4 mb-4 rounded-md ele-bg"
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
                    <GuideDetails tour={tour} />
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

                <div
                  className={`rounded-md px-2 ${
                    e.status == "ACCEPTED"
                      ? "bg-green-700"
                      : e.status == "PENDING"
                      ? "bg-amber-400"
                      : "bg-red-500"
                  }`}
                >
                  {e.status}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Opps... there are no tours scheduled for you rn !!</div>
      )}
    </div>
  );
};

export default Tours;
