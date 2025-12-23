"use client";
import { Eye, EyeClosed } from "lucide-react";
import GuideCards from "./guide-cards";
import UpcomingTours from "./upcoming-tours";
import RecentActivityComp from "./recent-activity";

import type { Guide } from "./type/type";

const page = () => {
  const guideData: Guide = {
    id: "guide-1",
    name: "Sarah Martinez",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 4.9,
    totalReviews: 247,
    totalTours: 312,
    memberSince: "2022",
    specialties: ["Cultural Tours", "Food & Wine", "Photography"],
    languages: ["English", "Spanish", "French"],
    isOnline: true,
  };

  const handleGuideVisibility = () => {
    //change the visibility to !guideData.isOnline
  };

  return (
    <div className="mx-8">
      <div className="flex justify-between items-center">
        <div>
          <h3>Welcome back,{guideData.name}! </h3>
          <p>Here's what's happening with your tours today.</p>
        </div>

        <div>
          <button
            onClick={handleGuideVisibility}
            className={` flex items-center justify-between ${
              guideData.isOnline
                ? "text-white bg-green-700"
                : "text-white bg-gray-700"
            } min-w-32 rounded-md hover:cursor-pointer py-2 px-3 `}
          >
            <div>
              {guideData.isOnline ? <Eye size={20} /> : <EyeClosed size={20} />}
            </div>
            <div> {guideData.isOnline ? "Go Offline" : "Go Online"} </div>
          </button>
        </div>
      </div>

      <GuideCards />

      <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
        <UpcomingTours />
        <RecentActivityComp />
      </div>
    </div>
  );
};

export default page;
