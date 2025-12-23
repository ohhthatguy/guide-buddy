"use client";

import { Shield } from "lucide-react";
import Button from "../../../../component/Button/page";
import { useTheme } from "next-themes";
const PaymentSection = ({ rate }: { rate: number }) => {
  const { theme } = useTheme();
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
            // onChange={handleInputDataChange}
            // value={signupData.name}
            required
          />

          <div>
            <label className="">Time</label>
            <input
              className="border rounded-xl w-full px-4 py-2  mt-2 mb-4"
              name="email"
              type="time"
              // onChange={handleInputDataChange}
              // value={signupData.email}
              required
            />
          </div>

          <label className="">Duration </label>
          <br />

          <select
            name="duration"
            // onChange={handleInputDataChange}
            // value={signupData.role}
            className="border rounded-xl w-full p-4 mt-2 mb-8"
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hour</option>

            <option value="3">3 Hour</option>

            <option value="4">4 Hour</option>
            <option value="12">Half Day</option>

            <option value="24">full Day</option>
          </select>

          <Button size="full">Book Now</Button>
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
