"use client";
import { useState } from "react";
import { Shield } from "lucide-react";
import Button from "../../../../component/Button/page";
import { useTheme } from "next-themes";
import type { TourDataType } from "../type/type";
import { useSearchParams } from "next/navigation";

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

  const initPaymentSectionData: TourDataType = {
    id: "",
    date: searchParams ? (searchParams.get("date") as string) : "",
    duration: searchParams ? (searchParams.get("duration") as string) : "",
    location: searchParams ? (searchParams.get("location") as string) : "",
    time: {
      startTime: searchParams ? (searchParams.get("startTime") as string) : "",
      endTime: searchParams ? (searchParams.get("endTime") as string) : "",
    },
    price: 0,
    status: "PENDING",
    guide: { id: guideId, name: guideName },
    client: { id: "", name: "" },
  };
  const [paymentSectionData, setPaymentSectionData] = useState<TourDataType>(
    initPaymentSectionData
  );

  const handleInputDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    console.log(e);
    setPaymentSectionData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "time"
          ? { startTime: e.target.value, endTime: "" }
          : e.target.value,
    }));
  };

  const handlePaymentSection = async () => {
    const durationNum = Number(paymentSectionData.duration);

    const totalPrice = durationNum * rate;

    const [hours, minutes] = paymentSectionData.time.startTime
      .split(":")
      .map(Number);
    const endHour = (hours + durationNum) % 24;

    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
      minutes - 1
    ).padStart(2, "0")}`;

    const finalData: TourDataType = {
      ...paymentSectionData,
      price: totalPrice,
      time: {
        ...paymentSectionData.time,
        endTime: formattedEndTime,
      },
    };

    console.log("Final Booking Data, POST:", finalData);

    const tourId = searchParams.get("tourId");

    try {
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

  console.log(paymentSectionData);
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

        <div className="my-4">
          <label className="">Date</label>
          <input
            className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
            name="date"
            type="date"
            onChange={handleInputDataChange}
            value={paymentSectionData.date}
            required
          />

          <div>
            <label className="">Time</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
              name="time"
              type="time"
              onChange={handleInputDataChange}
              value={paymentSectionData.time.startTime}
              required
            />
          </div>

          <div>
            <label className="">Location</label>
            <textarea
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
              name="location"
              rows={5}
              placeholder="Describe the Area where you want to visit..."
              onChange={handleInputDataChange}
              value={paymentSectionData.location}
              required
            />
          </div>

          <label className="">Duration </label>
          <br />

          <select
            name="duration"
            onChange={handleInputDataChange}
            value={paymentSectionData.duration}
            className="border rounded-xl w-full p-4 mt-2 mb-8"
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hour</option>

            <option value="3">3 Hour</option>

            <option value="4">4 Hour</option>
            <option value="12">Half Day</option>

            <option value="24">full Day</option>
          </select>

          <Button size="full" onClick={handlePaymentSection}>
            {searchParams ? "Update" : "Book Now"}
          </Button>
        </div>

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
