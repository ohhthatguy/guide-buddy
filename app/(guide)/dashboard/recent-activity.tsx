"use client";

import type { RecentActivity } from "./type/type";
import type { TourDataType } from "../guide-profile/type/type";
import { useState, useEffect } from "react";
import RecentActivityClientComp from "../clientcomp/RecentActivityClientComp";
import { isFinalPage } from "@/lib/helper/pagination";
const RecentActivityComp = ({
  serializedTour,
  id,
}: {
  serializedTour: TourDataType[];
  id: string;
}) => {
  const [page, setPage] = useState(1);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/guide/dashboard/recentActivities?guideId=${serializedTour[0].guide.id}&recentPageNumber=${page}`,
        );

        const data = await res.json();
        console.log(data);
        const final = isFinalPage(Number(page), data.finalData.totalDataCount);
        setRecentActivity(data.finalData.recentActivity);
        setIsLastPage(final);
      } catch (error) {
        console.log("Errror in fetching data; ", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <div className=" p-4 comp-bg rounded-2xl ">
      <div className="mb-4">
        <h4>Recent Activity</h4>
        <p>Latest updates and notifications</p>
      </div>

      {/* <div
            className="overflow-auto px-4 h-[50vh] 
        "
          >
            {recentActivity?.length > 0 ? (
              recentActivity.map((e: RecentActivity, index: number) => (
                <RecentActivityClientComp
                  key={index}
                  e={e}
                  index={index}
                  guideId={id}
                  setPage={setPage}
                  page={page}
                  isLastPage={isLastPage}
                  totalLength={recentActivity.length}
                  recentActivity={recentActivity}
                />
              ))
            ) : (
              <div className="text-gray-700">
                You dont have any activity to show!
              </div>
            )}
          </div> */}

      <>
        {!isLoading ? (
          <div
            className="overflow-auto px-4 h-[50vh] 
        "
          >
            {recentActivity?.length > 0 ? (
              recentActivity.map((e: RecentActivity, index: number) => (
                <RecentActivityClientComp
                  key={index}
                  e={e}
                  index={index}
                  guideId={id}
                  setPage={setPage}
                  page={page}
                  isLastPage={isLastPage}
                  totalLength={recentActivity.length}
                  recentActivity={recentActivity}
                />
              ))
            ) : (
              <div className="text-gray-700">
                You dont have any activity to show!
              </div>
            )}
          </div>
        ) : (
          <div className="h-[50vh] grid gap-4">
            <div className="h-4 w-3/4 animate-pulse  rounded bg-slate-200"></div>
            <div className="h-4 w-1/2 rounded animate-pulse  bg-slate-200"></div>
            <div className="h-4 w-3/4 animate-pulse  rounded bg-slate-200"></div>
            <div className="h-4 w-1/2 rounded animate-pulse  bg-slate-200"></div>
          </div>
          // <div className=" px-4 animate-pulse h-[50vh] w-full rounded-xl bg-slate-200"></div>
        )}
      </>
    </div>
  );
};

export default RecentActivityComp;

// for this use the AJAX method i.e make this a clnet component and fetch data throgh a route
//in there take both serialized tour and review ugins transaction
// find the total lentght of both of the document and add it together for pagination purpose tp find final page

// import type { RecentActivity } from "./type/type";
// import type { TourDataType } from "../guide-profile/type/type";
// import { useGetTimingMessage } from "@/lib/helper/useGetTimingMessage";
// import ReviewModel from "@/lib/database/Model/Review";

// import RecentActivityClientComp from "../clientcomp/RecentActivityClientComp";
// const RecentActivityComp = async ({
//   serializedTour,
//   id,
// }: {
//   serializedTour: TourDataType[];
//   id: string;
// }) => {
//   try {
//     let recentActivity: RecentActivity[] = [];

//     const tourActivities: RecentActivity[] = (serializedTour || []).map(
//       (e: TourDataType) => ({
//         type: "booking",
//         message:
//           e.status === "PENDING"
//             ? `New booking request from ${e.client.name}!`
//             : e.status === "REJECTED"
//             ? `Booking request of ${e.client.name} Rejected!`
//             : `Booking request of ${e.client.name} Accepted!`,
//         // FIX: Passing as an object to match your function definition
//         time: useGetTimingMessage(e.createdAt),
//         id: e._id,
//       })
//     );

//     console.log("Tour at recent activity", tourActivities);

//     const dataReview = await ReviewModel.find({
//       guideId: serializedTour[0].guide.id,
//     })
//       .populate({
//         path: "clientId",
//         model: "Client",
//         populate: {
//           path: "clientId",
//           model: "Account",
//           select: "name",
//         },
//       })
//       .lean();
//     const data = JSON.parse(JSON.stringify(dataReview));
//     console.log(data);
//     const reviewActivities: RecentActivity[] = (data || []).map((e) => ({
//       type: "review",
//       message: `New review from ${e.clientId?.clientId?.name || "Anonymous"}!`,
//       time: useGetTimingMessage(e.createdAt),
//       id: e._id,
//     }));
//     console.log("Review at recent activity", reviewActivities);

//     // recentActivity = [...tourActivities, ...reviewActivities];
//     recentActivity = [...reviewActivities];

//     return (
//       <div className=" p-4 comp-bg rounded-2xl ">
//         <div className="mb-4">
//           <h4>Recent Activity</h4>
//           <p>Latest updates and notifications</p>
//         </div>

//         <div
//           className="overflow-auto px-4 h-[50vh]
//         "
//         >
//           {recentActivity?.length > 0 ? (
//             recentActivity.map((e: RecentActivity, index: number) => (
//               <RecentActivityClientComp
//                 key={index}
//                 e={e}
//                 index={index}
//                 guideId={id}
//               />
//             ))
//           ) : (
//             <div className="text-gray-700">
//               You dont have any activity to show!
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.log("ERROR IN THE RECENT ACTIIVTY AREA, ", error);
//     // return notFound();
//   }
// };

// export default RecentActivityComp;
