"use client";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import type { Guide } from "./type/type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const IntroPart = () => {
  const demoGuideData: Guide = {
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
    isOnline: false,
  };

  const [guideData, setGuideData] = useState(demoGuideData);
  const [isLoading, setIsLoading] = useState(false);

  const handleGuideVisibility = async (currentStatus: boolean) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/guide/dashboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: currentStatus }),
      });
      if (!res.ok) {
        throw new Error("Patch response didnt came");
      }
      const data = await res.json();

      console.log(data);

      setGuideData((prev) => ({
        ...prev,
        isOnline: data.data.available,
      }));

      console.log("Succesfully changed visibility");
    } catch (error) {
      console.log("Error in handleGuideVisibility frontned: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const initialDataFetch = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/guide/dashboard");
        const data = await res.json();

        console.log(data);

        setGuideData((prev) => ({
          ...prev,
          isOnline: data.data.GuideData.available,
          name: data.data.name,
        }));
      } catch (error) {
        console.log("Error in dashboard guide frontned: ", error);
      }
      setIsLoading(false);
    };

    initialDataFetch();
  }, []);
  return (
    <div className="min-[500px]:flex justify-between items-center my-4">
      <div>
        <p className="text-[clamp(1.5rem,3vw+0.1rem,3rem)] ">
          Welcome, {guideData.name}!{" "}
        </p>
        <p className="text-[clamp(0.9rem,2vw+0.1rem,1rem)] ">
          Here's what's happening with your tours today.
        </p>
      </div>

      {/* small screen */}
      <div className=" my-4 flex justify-between  items-center comp-bg min-[500px]:hidden">
        <div className=" p-2 ">
          <p className="text-[clamp(1.2rem,3vw+0.1rem,2rem)] font-medium">
            {guideData.isOnline ? "Go Offline" : "Go Online"}
          </p>
          <p className="text-[clamp(0.9rem,2vw+0.1rem,1rem)]">
            {guideData.isOnline
              ? "Take a break from taking requests"
              : "Available for new requests"}
          </p>
        </div>

        <div>
          <button
            onClick={() => handleGuideVisibility(guideData.isOnline)}
            className={` flex items-center justify-between ${
              guideData.isOnline
                ? "text-white bg-green-700"
                : "text-white bg-gray-700"
            }  rounded-md hover:cursor-pointer py-1 px-2 clamp- `}
            // py-2 px-3
          >
            <div>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : guideData.isOnline ? (
                <Eye size={20} />
              ) : (
                <EyeClosed size={20} />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* big screen */}
      <div className="hidden my-4  justify-around items-center comp-bg  min-[500px]:flex ">
        <div>
          <button
            onClick={() => handleGuideVisibility(guideData.isOnline)}
            className={` flex items-center justify-between ${
              guideData.isOnline
                ? "text-white bg-green-700"
                : "text-white bg-gray-700"
            }  rounded-md hover:cursor-pointer py-1 px-2 clamp- `}
            // py-2 px-3
          >
            <div className="flex gap-2">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : guideData.isOnline ? (
                <Eye size={20} />
              ) : (
                <EyeClosed size={20} />
              )}
              <p className="text-[clamp(0.9rem,2vw+0.1rem,1rem)]">
                {guideData.isOnline ? "Go Offline" : "Go Online"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPart;
