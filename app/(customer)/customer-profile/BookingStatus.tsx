"use client";

import { useState } from "react";
import { TourDataType } from "@/app/(guide)/guide-profile/type/type";
import { ChangeEvent } from "react";

const BookingStatus = ({ e }: { e: TourDataType }) => {
  const [statusTourData, setStatusTourData] = useState<TourDataType>(e);

  const handleBookingStatusChange = (
    ele: ChangeEvent<HTMLSelectElement>,
    e: TourDataType
  ) => {
    console.log("Changed Staus TO: ", ele.target.value);
    console.log("OF tour DATA: ", e);
    const selectedStatus = ele.target.value as
      | "ACCEPTED"
      | "PENDING"
      | "REJECTED";

    setStatusTourData((data) => ({ ...data, status: selectedStatus }));
  };

  return (
    <div>
      <select
        name="status"
        onChange={(ele) => handleBookingStatusChange(ele, e)}
        value={statusTourData.status}
        className={`border rounded-xl  p-2 ${
          statusTourData.status == "ACCEPTED"
            ? "bg-green-500"
            : statusTourData.status == "PENDING"
            ? "bg-amber-400"
            : "bg-red-500"
        }`}
      >
        <option value="ACCEPTED">ACCEPTED</option>
        <option className="" value="PENDING">
          PENDING
        </option>
        <option value="REJECTED">REJECTED</option>
      </select>
    </div>
  );
};

export default BookingStatus;
