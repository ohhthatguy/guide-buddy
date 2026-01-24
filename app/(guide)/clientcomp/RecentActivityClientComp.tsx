"use client";
import type { RecentActivity } from "../dashboard/type/type";
import { useDispatch } from "react-redux";
import { setTourId } from "@/lib/feature/guide/upcomingAndRecentTourConnection";
import { useRouter } from "next/navigation";
import { isFinalPage } from "@/lib/helper/pagination";

const RecentActivityClientComp = ({
  e,
  index,
  guideId,
  setPage,
  page,
  isLastPage,
  totalLength,
  recentActivity,
}: {
  e: RecentActivity;
  index: number;
  guideId: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  isLastPage: boolean;
  totalLength: number;
  recentActivity: RecentActivity[];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRecentActivity = (e: RecentActivity) => {
    console.log(e);

    //every type has its id, revewID, tourId. match the one with the given id

    if (e.type == "review") {
      //move to the guide-profile
      router.push(`/guide-profile/${guideId}?focusReview=true&page=1`);
    }

    if (e.type == "booking") {
      //make that litlte animation of selecting the thing from upcoming tour.

      dispatch(setTourId(e.id));
    }
  };

  return (
    <div key={index}>
      <div
        className="grid grid-cols-[5%_95%] gap-4 p-2 mb-4 ele-bg rounded-md hover:cursor-pointer  hover:shadow-md shadow-xs hover:scale-[1.01] scale-100 transition-all duration-500"
        onClick={() => handleRecentActivity(e)}
      >
        <div className="flex justify-end  items-center">
          <span className=" inline-block rounded-full bg-blue-700 w-2 h-2"></span>
        </div>
        <div className="">
          <div>{e.message}</div>
          <div>{e.time}</div>
        </div>
      </div>

      {!isLastPage && totalLength - 1 == index && (
        <div
          className=" text-center cursor-pointer hover:scale-[1.01] scale-100"
          onClick={() => setPage((prev) => prev + 1)}
        >
          More
        </div>
      )}
      {length - 1 == index && <div id="next-review-link-of-dashboard"></div>}
    </div>
  );
};

export default RecentActivityClientComp;
