import type { RecentActivity } from "./type/type";
import type { TourDataType } from "../guide-profile/type/type";
import { useGetTimingMessage } from "@/lib/helper/useGetTimingMessage";
import ReviewModel from "@/lib/database/Model/Review";
import { notFound } from "next/navigation";

const RecentActivityComp = async ({
  serializedTour,
}: {
  serializedTour: TourDataType[];
}) => {
  try {
    let recentActivity: RecentActivity[] = [];

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
      })
    );

    console.log(serializedTour);
    const data = await ReviewModel.find({ guideId: serializedTour[0].guide.id })
      .populate({
        path: "clientId",
        populate: {
          path: "clientId",
          select: "name",
        },
      })
      .lean();

    console.log(data);
    const reviewActivities: RecentActivity[] = (data || []).map((e) => ({
      type: "review",
      message: `New review from ${e.clientId?.clientId?.name || "Anonymous"}!`,
      time: useGetTimingMessage(e.createdAt),
      id: e._id,
    }));

    recentActivity = [...tourActivities, ...reviewActivities];

    return (
      <div className=" p-4 comp-bg rounded-2xl">
        <div className="mb-4">
          <h4>Recent Activity</h4>
          <p>Latest updates and notifications</p>
        </div>

        <div>
          {recentActivity?.length > 0 ? (
            recentActivity.map((e: RecentActivity, index: number) => (
              <div
                key={index}
                className="grid grid-cols-[5%_95%] gap-4 p-2 mb-4 ele-bg rounded-md hover:cursor-pointer  hover:shadow-md shadow-xs hover:scale-[1.01] scale-100 transition-all duration-500"
              >
                <div className="flex justify-end  items-center">
                  <span className=" inline-block rounded-full bg-blue-700 w-2 h-2"></span>
                </div>
                <div className="">
                  <div>{e.message}</div>
                  <div>{e.time}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-700">
              You dont have any activity to show!
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.log("ERROR IN THE RECENT ACTIIVTY AREA, ", error);
    return notFound();
  }
};

export default RecentActivityComp;
