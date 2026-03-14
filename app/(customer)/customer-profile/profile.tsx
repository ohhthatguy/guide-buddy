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
        // setClientData({
        //   phone: 9009823442342342342340,
        //   languages: [
        //     "asdasd",
        //     "dsfsdf",
        //     "234234",
        //     "asdasd",
        //     "asdasd",
        //     "dsfsdf",
        //     "234234",
        //     "asdasd",
        //     "asdasd",
        //     "dsfsdf",
        //     "234234",
        //     "asdasd",
        //     "asdasd",
        //     "dsfsdf",
        //     "234234",
        //     "asdasd",
        //   ],
        // });
      } catch (error) {
        console.log("ERROR IN GETTING THE CLIENT DETAIL DATA: ", error);
      }
    };
    getClientDetails();
  }, []);

  console.log(tour);

  const { theme } = useTheme();
  return (
    <div className="flex flex-col sm:flex-row justify-center  comp-bg p-2 rounded-2xl  ">
      <div className=" flex justify-center items-center  flex-1">
        {/* <img
          src={"https://www.gettyimages.ca/photos/pictures-of"}
          className="object-cover object-top rounded-full h-48 w-48"
        /> */}

        <img
          src="https://picsum.photos/400"
          className="object-cover object-top rounded-full h-32 w-32 md:h-48 md:w-48"
          alt="Profile"
        />
      </div>

      <div className="ele-bg rounded-2xl p-4 flex-2 flex flex-col gap-2 ">
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
            <span className="font-bold flex-wrap">
              {clientData?.phone || "default number"}
            </span>{" "}
          </p>
        </div>

        <div className="flex gap-4  ">
          <Languages size={18} />{" "}
          <div className="flex gap-4  flex-wrap flex-1">
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
