"use client";
import {
  MapPin,
  Star,
  ClipboardList,
  Clock,
  Award,
  Phone,
  Languages,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { useEffect, useState } from "react";

const Profile = ({ tour }: { tour: TourDataType }) => {
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const getClientDetails = async () => {
      try {
        const res = await fetch(
          `/api/user/activity/getClientDetail?client_ID=${tour.client.id}`,
        );
        console.log(res);
        const data = await res.json();
        console.log(data.res);
        setClientData(data.res);
      } catch (error) {
        console.log("ERROR IN GETTING THE CLIENT DETAIL DATA: ", error);
      }
    };
    getClientDetails();
  }, []);

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
        <div>
          {" "}
          <div className="mb-4">
            <p className="text-4xl font-medium">{tour.client.name}</p>
            <p className=" font-medium">{clientData?.bio || "default bio"}</p>
          </div>
        </div>

        <div>
          <p
            className={` flex items-center gap-6  ${
              theme == "dark" ? "text-gray-500" : "text-gray-800"
            }`}
          >
            <Phone size={14} />{" "}
            <span className="font-bold">
              {clientData?.phone || "default number"}
            </span>{" "}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <Languages size={18} />
          <div className="flex gap-4">
            {clientData?.languages.map((e: any, index: number) => (
              <span
                key={index}
                className={`p-1 rounded-xl text-sm ${
                  theme == "dark" ? "text-white" : "text-black"
                } ele-bg`}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
