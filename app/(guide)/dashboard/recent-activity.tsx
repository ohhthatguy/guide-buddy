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
