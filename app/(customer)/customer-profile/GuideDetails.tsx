import type { MongoId } from "@/app/(guide)/guide-profile/type/type";
import Link from "next/link";
export const GuideDetails = ({
  guideid,
  tourid,
  date,
  startTime,
  endTime,
  location,
  duration,
  guideName,
  meetup,
}: {
  guideid: string | MongoId;
  tourid: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  duration: string;
  guideName: string;
  meetup: [number, number];
}) => {
  return (
    <Link
      href={`/guide-profile/${guideid}?tourId=${tourid}&date=${date}&startTime=${startTime}&endTime=${endTime}&location=${location}&duration=${duration}&meetup=${meetup}&page=1`}
      // onClick={() =>
      //   router.push(
      //     `/guide-profile/${guideid}?tourId=${tourid}&date=${date}
      //     &startTime=${startTime}&endTime=${endTime}&location=${location}&duration=${duration}&meetup=${meetup}&page=1`
      //   )
      // }
      className="hover:cursor-pointer hover:text-white hover:bg-black"
    >
      Guide: {guideName}
    </Link>
  );
};
