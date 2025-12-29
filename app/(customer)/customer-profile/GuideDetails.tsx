"use client";
import { useRouter } from "next/navigation";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";

export const GuideDetails = ({ tour }: { tour: TourDataType }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/guide-profile/${tour.guide.id}?tourId=${tour._id}&date=${tour.date}&startTime=${tour.time.startTime}&endTime=${tour.time.endTime}&location=${tour.location}&duration=${tour.duration}`
        )
      }
      className="hover:cursor-pointer"
    >
      Guide: {tour.guide.name}
    </div>
  );
};
