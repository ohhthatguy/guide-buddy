import type { UpcomingTour } from "./type/type";
import { Calendar, Clock, MapPin } from "lucide-react";

const UpcomingTours = () => {
  const upcomingTours: UpcomingTour[] = [
    {
      id: "1",
      title: "Historical Downtown Walking Tour",
      client: "Michael Chen",
      date: "Today",
      time: "2:00 PM",
      duration: "3 hours",
      location: "Downtown District",
      price: "$120",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Food Market Experience",
      client: "Emma Wilson",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "2.5 hours",
      location: "Central Market",
      price: "$95",
      status: "confirmed",
    },
    {
      id: "3",
      title: "Sunset Photography Tour",
      client: "James Brown",
      date: "Dec 25",
      time: "4:30 PM",
      duration: "2 hours",
      location: "Coastal Viewpoint",
      price: "$150",
      status: "pending",
    },
  ];

  return (
    <div className=" p-4 comp-bg rounded-2xl">
      <div className="mb-4">
        <h4>Upcoming Tours</h4>
        <p>Your scheduled tours for the next few days</p>
      </div>

      {upcomingTours?.length > 0 ? (
        upcomingTours.map((e: UpcomingTour, index: number) => (
          <div
            key={index}
            className="grid grid-cols-[5%_95%] p-4  gap-4 mb-4 rounded-md ele-bg"
          >
            <div>
              <Calendar size={44} className="p-2 rounded-md comp-bg" />
            </div>

            <div className="grid gap-1 px-4">
              <div className="flex justify-between ">
                <div className="font-semibold">{e.title}</div>
                <div className="font-medium">{e.price}</div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div>{e.client}</div>
                  <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                      {" "}
                      <Calendar size={18} />{" "}
                      <div>
                        {e.date} at {e.time}
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {" "}
                      <Clock size={18} /> <div>{e.duration}</div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {" "}
                      <MapPin size={18} /> <div>{e.location}</div>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-md px-2 ${
                    e.status == "confirmed"
                      ? "bg-green-700"
                      : e.status == "pending"
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

export default UpcomingTours;
