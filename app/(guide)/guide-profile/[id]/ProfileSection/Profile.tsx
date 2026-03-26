"use client";
import { MapPin, Star, Pen, Clock, Award, MoveLeft } from "lucide-react";
import { useTheme } from "next-themes";
import {
  useGetCurrentPosition,
  distanceFromThisToMe,
} from "@/lib/helper/useGetCurrentPosition";
import { useEffect, useState, useRef } from "react";
import GuideEditForm from "@/app/(guide)/component/GuideEditForm";

const Profile = ({
  profileData,
  location,
  data,
}: {
  profileData: any;
  location: [number, number];
  data: any;
}) => {
  console.log(profileData);
  const { theme } = useTheme();
  const [distance, setDistance] = useState(0);
  const modalBtn = useRef<HTMLDialogElement | null>(null);

  const pos = useGetCurrentPosition();
  useEffect(() => {
    if (pos) {
      console.log("lat1: ", pos[0]);
      console.log("lng1: ", pos[1]);
      console.log("lat2: ", location[1]);
      console.log("lng2: ", location[0]);

      const dis = distanceFromThisToMe(
        location[1],
        location[0],
        pos[0],
        pos[1],
      );
      console.log("Distance: ", dis);
      setDistance(dis);
    }
  }, [pos]);

  return (
    <div className=" sm:flex-1 sm:grid comp-bg p-2 rounded-2xl ">
      <div className="flex relative justify-center items-center flex-1  ">
        <div
          className="absolute top-6 right-2"
          onClick={() => modalBtn.current?.showModal()}
        >
          <Pen className="hover:cursor-pointer scale-100  hover:fill-yellow-500 hover:scale-90 hover:duration-200 hover:transition-all" />
        </div>
        <div className=" relative">
          <img
            src={profileData.profileURL}
            className="object-cover  object-top rounded-full h-48 w-48 "
          />
          <span
            className={` h-8 w-8 justify-end right-4 bottom-3  absolute rounded-full border-red-500 ${
              profileData.available ? "bg-green-700 " : "bg-gray-500"
            }`}
          ></span>
        </div>
      </div>

      <div className="ele-bg rounded-2xl p-4 flex-2 flex flex-col gap-2 ">
        <div className="flex flex-col justify-center items-center ">
          {" "}
          <div className="flex justify-between items-center gap-4 ">
            <p className=" font-medium text-[clamp(0.1rem,5vw+0.01rem,1rem)]">
              {profileData.name}
            </p>
          </div>
          <p className="flex items-center gap-2 mb-1">
            {profileData.speciality.map((e: string, index: number) => (
              <span
                key={index}
                className={`text-md ${
                  theme == "dark"
                    ? "text-gray-400 font-semibold"
                    : "text-gray-800 font-semibold"
                }`}
              >
                {/* 0 1 2 3  */}
                {e}
                {profileData.speciality.length - index > 1 && <span>,</span>}
              </span>
            ))}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 place-items-center ">
          {/* <p className="flex items-center  gap-1"> */}

          <div>
            <p
              className={` flex items-center gap-2 mb-1 text-[clamp(0.02rem,4vw+0.01rem,1rem)] ${
                theme == "dark" ? "text-gray-500" : "text-gray-800"
              }`}
            >
              <MapPin size={16} />{" "}
              <span className="font-semibold ">
                {distance == 0 ? "~ 0" : distance} km
              </span>{" "}
            </p>

            <p
              className={` flex items-center gap-2 mb-1 text-[clamp(0.02rem,4vw+0.01rem,1rem)] ${
                theme == "dark" ? "text-gray-500" : "text-gray-800"
              }`}
            >
              <Star size={16} />{" "}
              <span className="font-bold">{profileData.rating}</span>{" "}
              <span
                className={`${
                  theme == "dark" ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {" "}
                ({profileData.reviews} reviews)
              </span>
            </p>
          </div>

          <div>
            <p
              className={` flex items-center gap-2 mb-1  text-[clamp(0.02rem,4vw+0.01rem,1rem)] ${
                theme == "dark" ? "text-gray-500" : "text-gray-800"
              }`}
            >
              <Clock size={14} />
              <span className="font-semibold">
                {" "}
                {profileData.responseTime}{" "}
              </span>
              response
            </p>

            <p
              className={` flex items-center gap-2 text-[clamp(0.02rem,4vw+0.01rem,1rem)] ${
                theme == "dark" ? "text-gray-500" : "text-gray-800"
              }`}
            >
              <Award size={14} />{" "}
              <span className="font-bold "> {profileData.toursCompleted}</span>{" "}
              completed
            </p>
          </div>
        </div>
      </div>

      <dialog ref={modalBtn} className="m-auto  rounded-lg p-2">
        <div className="flex gap-8   py-4 px-1 ele-bg">
          <MoveLeft
            className="hover:cursor-pointer"
            onClick={() => modalBtn.current?.close()}
          />
          <div>Edit Profile</div>
        </div>
        <GuideEditForm data={data} modalBtn={modalBtn} />
      </dialog>
    </div>
  );
};

export default Profile;
