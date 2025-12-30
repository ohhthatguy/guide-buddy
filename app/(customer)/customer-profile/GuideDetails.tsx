"use client";
import { useRouter } from "next/navigation";
import type { MongoId } from "@/app/(guide)/guide-profile/type/type";
export const GuideDetails = ({
  guideid,
  tourid,
  date,
  startTime,
  endTime,
  location,
  duration,
  guideName,
}: {
  guideid: string | MongoId;
  tourid: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  duration: string;
  guideName: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/guide-profile/${guideid}?tourId=${tourid}&date=${date}
          &startTime=${startTime}&endTime=${endTime}&location=${location}&duration=${duration}`
        )
      }
      className="hover:cursor-pointer"
    >
      Guide: {guideName}
    </div>
  );
};
