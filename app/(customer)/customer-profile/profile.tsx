"use client";
import { MapPin, Star, ClipboardList, Clock, Award } from "lucide-react";
import { useTheme } from "next-themes";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";

const Profile = ({ tour }: { tour: TourDataType }) => {
  console.log(tour);
  const { theme } = useTheme();
  return (
    <div className="flex justify-center  h-52 comp-bg p-2 rounded-2xl ">
      <div className=" flex justify-center items-center  flex-1">
        <img
          src={"/default-avatar.png"}
          className="object-cover object-top rounded-full h-48 w-48"
        />
      </div>

      <div className="ele-bg rounded-2xl p-4 flex-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="flex items-center  gap-1">
            <MapPin size={18} /> <span className="font-semibold">default</span>{" "}
          </p>
        </div>

        <div>
          {" "}
          <div className="flex justify-between items-center ">
            <p className="text-4xl font-medium">{tour.client.name}</p>
          </div>
        </div>
        <div>
          <p
            className={` flex items-center gap-2  ${
              theme == "dark" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            <Award size={14} /> <span className="font-bold"> 0</span> tours
            completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
