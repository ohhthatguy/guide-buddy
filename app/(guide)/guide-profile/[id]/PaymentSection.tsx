"use client";

import { Shield } from "lucide-react";
import { z } from "zod";
import { useTheme } from "next-themes";
import type { TourDataType } from "../type/type";
import { useSearchParams } from "next/navigation";
import SetPositionOnMap from "@/component/Map/setPositionOnMap/SetPositionOnMap";
import { useEffect, useState } from "react";
import { paymentSchema } from "@/lib/zodSchema/paymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";

const PaymentSection = ({
  guideName,
  guideId,
  rate,
}: {
  guideName: string;
  guideId: string;
  rate: number;
}) => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  const currentPos = useGetCurrentPosition();

  type initMeetupLocationDataType = z.infer<
    typeof paymentSchema.shape.meetup_location
  >;
  const [initMeetupLocationData, setInitMeetupLocationData] =
    useState<initMeetupLocationDataType>({
      type: "Point",
      coordinates: [0, 0],
    });

  // const handleParamMeetupLocation = () => {
  //   const data = searchParams?.get("meetup") ?? `0,0`;
  //   console.log(data);
  //   // if (!data) return;
  //   const meetupLocationData: { type: "Point"; coordinates: [number, number] } =
  //     {
  //       type: "Point" as const,
  //       coordinates: data!.split(",").map(Number) as [number, number],
  //     };
  //   console.log(meetupLocationData);
  //   return meetupLocationData;
  // };

  useEffect(() => {
    if (!currentPos) return;

    console.log("We finally have the real position:", currentPos);

    const data = searchParams?.get("meetup");
    console.log(data);

    const meetupLocationData: { type: "Point"; coordinates: [number, number] } =
      {
        type: "Point" as const,
        coordinates: data
          ? (data!.split(",").map(Number).reverse() as [number, number])
          : currentPos,
      };
    console.log(meetupLocationData);
    setValue("meetup_location", meetupLocationData);
    setInitMeetupLocationData(meetupLocationData);
  }, [currentPos]);

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, defaultValues },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      duration: searchParams ? (searchParams.get("duration") as string) : "",
      location: searchParams ? (searchParams.get("location") as string) : "",
      time: searchParams.get("startTime") as string,
      meetup_location: initMeetupLocationData,
      date: searchParams ? (searchParams.get("date") as string) : "",
    },
  });
  console.log("default values: ", defaultValues);

  console.log("Form Errors:", errors);
  // const initPaymentSectionData: TourDataType = {
  //   id: "",
  //   date: searchParams ? (searchParams.get("date") as string) : "",
  //   duration: searchParams ? (searchParams.get("duration") as string) : "",
  //   location: searchParams ? (searchParams.get("location") as string) : "",
  //   time: {
  //     startTime: searchParams ? (searchParams.get("startTime") as string) : "",
  //     endTime: searchParams ? (searchParams.get("endTime") as string) : "",
  //   },
  //   price: 0,
  //   status: "PENDING",
  //   guide: { id: guideId, name: guideName },
  //   client: { id: "", name: "" },
  //   meetup_location: handleParamMeetupLocation(),
  // };
  // const [paymentSectionData, setPaymentSectionData] = useState<TourDataType>(
  //   initPaymentSectionData,
  // );

  // const handleInputDataChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >,
  // ) => {
  //   console.log(e);
  //   setPaymentSectionData((prev) => ({
  //     ...prev,
  //     [e.target.name]:
  //       e.target.name === "time"
  //         ? { startTime: e.target.value, endTime: "" }
  //         : e.target.value,
  //   }));
  // };

  type paymentZodType = z.infer<typeof paymentSchema>;

  const handlePaymentSection: SubmitHandler<paymentZodType> = async (data) => {
    console.log(data);
    const durationNum = Number(data.duration);

    const totalPrice = durationNum * rate;

    const [hours, minutes] = data.time.split(":").map(Number); //starttime
    const endHour = (hours + durationNum) % 24;

    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
      minutes - 1,
    ).padStart(2, "0")}`;

    // const { id, ...rest } = data;
    const finalData = {
      ...data,
      price: totalPrice,
      time: {
        startTime: data.time,
        endTime: formattedEndTime,
      },
      guideNote: "",
      status: "PENDING",
      guide: { id: guideId, name: guideName },
      client: { id: "", name: "" },
    };

    console.log("Final Booking Data, POST:", finalData);

    try {
      const tourId = searchParams.get("tourId");

      const res = await fetch("/api/user/activity/bookGuide", {
        method: tourId ? "PUT" : "POST",
        body: tourId
          ? JSON.stringify({
              finalData: finalData,

              ...(tourId && { tourId }),
            })
          : JSON.stringify(finalData),
      });

      const data = await res.json();
      console.log("data after succesful bbooking: ", data);
    } catch (error) {
      console.log("Error in booking tour frontend: ", error);
    }
  };

  // console.log(paymentSectionData);

  const handleMapClick = (lng: number, lat: number) => {
    console.log("HANDLE MAP CLICK NEW ONE LIFITNG STATE");
    setValue(
      "meetup_location",
      { type: "Point", coordinates: [lng, lat] },
      {
        shouldValidate: true, // This tells RHF to check Zod immediately
        shouldDirty: true,
      },
    );
  };

  return (
    <div>
      <div className=" p-8 comp-bg rounded-2xl sticky top-8">
        <div className="flex items-center gap-2 ">
          <h3>${rate}</h3>
          <span
            className={`text-xl ${
              theme == "light" ? "text-gray-700" : "text-gray-400"
            } `}
          >
            /hr
          </span>
        </div>

        <span
          className={`${theme == "light" ? "text-gray-700" : "text-gray-400"} `}
        >
          Minimum 1 hours*
        </span>

        <form onSubmit={handleSubmit(handlePaymentSection)} className="my-4">
          <div className="mb-4">
            <label className="">Date</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 "
              type="date"
              {...register("date")}
            />
            {errors.date?.message && (
              <p className="text-xs w-full text-red-500">
                {String(errors.date.message)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="">Time</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2"
              {...register("time")}
              type="time"
            />
            {errors.time?.message && (
              <p className="text-xs w-full text-red-500">
                {String(errors.time.message)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="">Location</label>
            <textarea
              className="border rounded-xl w-full px-4 py-2  mt-2 "
              {...register("location")}
              rows={5}
              placeholder="Describe the Area where you want to visit..."
            />
            {errors.location?.message && (
              <p className="text-xs w-full text-red-500">
                {String(errors.location.message)}
              </p>
            )}
          </div>

          {/* choose the meeting point on map */}
          <div className="mb-4">
            <label className="">Meeting Point</label>
            <br />
            <SetPositionOnMap
              initMeetupLocationData={initMeetupLocationData}
              setInitMeetupLocationData={setInitMeetupLocationData}
              handleMapClick={handleMapClick}
            />
            {errors.meetup_location?.message && (
              <p className="text-xs w-full text-red-500">
                {String(errors.meetup_location.message)}
              </p>
            )}
          </div>

          <div className=" mb-8">
            <label className="">Duration </label>
            <br />

            <select
              {...register("duration")}
              className="border rounded-xl w-full p-4 mt-2"
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Please select the duration
              </option>

              <option value="1">1 Hour</option>
              <option value="2">2 Hour</option>

              <option value="3">3 Hour</option>

              <option value="4">4 Hour</option>
              <option value="12">Half Day</option>

              <option value="24">full Day</option>
            </select>
            {errors.duration?.message && (
              <p className="text-xs w-full text-red-500">
                {String(errors.duration.message)}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-xl w-full hover:cursor-pointer p-2 text-white bg-linear-to-r from-blue-700 to-blue-600 "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : searchParams.size > 1 ? (
              "Update"
            ) : (
              "Book Now"
            )}
          </button>
        </form>

        <hr className="my-6" />

        <div className="grid place-items-center gap-4">
          <Shield />
          <p
            className={`text-center ${
              theme == "light" ? "text-gray-700" : "text-gray-400"
            } `}
          >
            Your payment is protected and only released after your tour is
            complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;

// "use client";
// import { useState } from "react";
// import { Shield } from "lucide-react";
// import Button from "../../../../component/Button/page";
// import { useTheme } from "next-themes";
// import type { TourDataType } from "../type/type";
// import { useSearchParams } from "next/navigation";
// import SetPositionOnMap from "@/component/Map/setPositionOnMap/SetPositionOnMap";

// const PaymentSection = ({
//   guideName,
//   guideId,
//   rate,
// }: {
//   guideName: string;
//   guideId: string;
//   rate: number;
// }) => {
//   const { theme } = useTheme();
//   const searchParams = useSearchParams();

//   const handleParamMeetupLocation = () => {
//     const data = searchParams?.get("meetup") ?? "0,0";
//     console.log(data);
//     // if(!data) return
//     const meetupLocationData: { type: "Point"; coordinates: [number, number] } =
//       {
//         type: "Point" as const,
//         coordinates: data!.split(",").map(Number) as [number, number],
//       };
//     return meetupLocationData;
//   };
//   const initPaymentSectionData: TourDataType = {
//     id: "",
//     date: searchParams ? (searchParams.get("date") as string) : "",
//     duration: searchParams ? (searchParams.get("duration") as string) : "",
//     location: searchParams ? (searchParams.get("location") as string) : "",
//     time: {
//       startTime: searchParams ? (searchParams.get("startTime") as string) : "",
//       endTime: searchParams ? (searchParams.get("endTime") as string) : "",
//     },
//     price: 0,
// status: "PENDING",
// guide: { id: guideId, name: guideName },
// client: { id: "", name: "" },
//     meetup_location: handleParamMeetupLocation(),
//   };
//   const [paymentSectionData, setPaymentSectionData] = useState<TourDataType>(
//     initPaymentSectionData,
//   );

//   const handleInputDataChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     console.log(e);
//     setPaymentSectionData((prev) => ({
//       ...prev,
//       [e.target.name]:
//         e.target.name === "time"
//           ? { startTime: e.target.value, endTime: "" }
//           : e.target.value,
//     }));
//   };

//   const handlePaymentSection = async () => {
//     const durationNum = Number(paymentSectionData.duration);

//     const totalPrice = durationNum * rate;

//     const [hours, minutes] = paymentSectionData.time.startTime
//       .split(":")
//       .map(Number);
//     const endHour = (hours + durationNum) % 24;

//     const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
//       minutes - 1,
//     ).padStart(2, "0")}`;

//     const { id, ...rest } = paymentSectionData;
//     const finalData: Omit<TourDataType, "id"> = {
//       ...rest,
//       price: totalPrice,
//       time: {
//         ...rest.time,
//         endTime: formattedEndTime,
//       },
//       guideNote: "",
//     };

//     console.log("Final Booking Data, POST:", finalData);

//     // const tourId = searchParams.get("tourId");

//     // try {
//     //   const res = await fetch("/api/user/activity/bookGuide", {
//     //     method: tourId ? "PUT" : "POST",
//     //     body: tourId
//     //       ? JSON.stringify({
//     //           finalData: finalData,

//     //           ...(tourId && { tourId }),
//     //         })
//     //       : JSON.stringify(finalData),
//     //   });

//     //   const data = await res.json();
//     //   console.log("data after succesful bbooking: ", data);
//     // } catch (error) {
//     //   console.log("Error in booking tour frontend: ", error);
//     // }
//   };

//   console.log(paymentSectionData);

//   return (
//     <div>
//       <div className=" p-8 comp-bg rounded-2xl sticky top-8">
//         <div className="flex items-center gap-2 ">
//           <h3>${rate}</h3>
//           <span
//             className={`text-xl ${
//               theme == "light" ? "text-gray-700" : "text-gray-400"
//             } `}
//           >
//             /hr
//           </span>
//         </div>

//         <span
//           className={`${theme == "light" ? "text-gray-700" : "text-gray-400"} `}
//         >
//           Minimum 1 hours*
//         </span>

//         <div className="my-4">
//           <label className="">Date</label>
//           <input
//             className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
//             name="date"
//             type="date"
//             onChange={handleInputDataChange}
//             value={paymentSectionData.date ?? ""}
//             required
//           />

//           <div>
//             <label className="">Time</label>
//             <input
//               className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
//               name="time"
//               type="time"
//               onChange={handleInputDataChange}
//               value={paymentSectionData.time.startTime ?? ""}
//               required
//             />
//           </div>

//           <div>
//             <label className="">Location</label>
//             <textarea
//               className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
//               name="location"
//               rows={5}
//               placeholder="Describe the Area where you want to visit..."
//               onChange={handleInputDataChange}
//               value={paymentSectionData.location ?? ""}
//               required
//             />
//           </div>

//           {/* choose the meeting point on map */}
//           <div>
//             <label className="">Meeting Point</label>
//             <br />
//             <SetPositionOnMap
//               paymentSectionData={paymentSectionData}
//               setPaymentSectionData={setPaymentSectionData}
//             />
//           </div>

//           <label className="">Duration </label>
//           <br />

//           <select
//             name="duration"
//             onChange={handleInputDataChange}
//             value={paymentSectionData.duration ?? `1`}
//             className="border rounded-xl w-full p-4 mt-2 mb-8"
//           >
//             <option value="1">1 Hour</option>
//             <option value="2">2 Hour</option>

//             <option value="3">3 Hour</option>

//             <option value="4">4 Hour</option>
//             <option value="12">Half Day</option>

//             <option value="24">full Day</option>
//           </select>

//           <Button size="full" onClick={handlePaymentSection}>
//             {searchParams.size ? "Update" : "Book Now"}
//           </Button>
//         </div>

//         <hr className="my-6" />

//         <div className="grid place-items-center gap-4">
//           <Shield />
//           <p
//             className={`text-center ${
//               theme == "light" ? "text-gray-700" : "text-gray-400"
//             } `}
//           >
//             Your payment is protected and only released after your tour is
//             complete
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSection;
