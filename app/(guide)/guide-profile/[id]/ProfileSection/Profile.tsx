"use client";
import { MapPin, Star, ClipboardList, Clock, Award } from "lucide-react";
import { useTheme } from "next-themes";

const Profile = ({ profileData }: { profileData: any }) => {
  console.log(profileData);
  const { theme } = useTheme();
  return (
    <div className="flex justify-center  h-52 comp-bg p-2 rounded-2xl ">
      <div className=" flex justify-center items-center  flex-1">
        <img
          src={profileData.avatar}
          className="object-cover object-top rounded-full h-48 w-48"
        />
      </div>

      <div className="ele-bg rounded-2xl p-4 flex-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="flex items-center  gap-1">
            <MapPin size={18} />{" "}
            <span className="font-semibold">{profileData.distance}</span>{" "}
          </p>

          <p>
            <span
              className={` px-2 py-1 text-white rounded-3xl  ${
                profileData.available ? "bg-green-700 " : "bg-gray-500"
              }`}
            >
              {profileData.available ? "Available" : "Unavailable"}
            </span>
          </p>
        </div>

        <div>
          {" "}
          <div className="flex justify-between items-center ">
            <p className="text-4xl font-medium">{profileData.name}</p>
            <p className="flex justify-center items-center gap-1">
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
          <p className="flex items-center gap-2 mb-1">
            <span
              className={`text-md ${
                theme == "dark"
                  ? "text-gray-400 font-semibold"
                  : "text-gray-800 font-semibold"
              }`}
            >
              {profileData.specialty}
            </span>
          </p>
        </div>
        <div>
          <p
            className={` flex items-center gap-2 mb-1 ${
              theme == "dark" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            <Clock size={14} />
            <span className="font-semibold "> {profileData.responseTime} </span>
            response
          </p>

          <p
            className={` flex items-center gap-2  ${
              theme == "dark" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            <Award size={14} />{" "}
            <span className="font-bold"> {profileData.toursCompleted}</span>{" "}
            tours completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
