"use client";
import { Calendar, Clock4, Hourglass } from "lucide-react";
import { useState } from "react";
import { setTourId } from "@/lib/feature/guide/upcomingAndRecentTourConnection";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const UpperPart = ({
  params,
  role,
  guideId,
}: {
  params: { [key: string]: string | string[] | undefined };
  role: "guide" | "client";
  guideId: string;
}) => {
  const { location, price, meetup, tourID, status, startTime, duration, date } =
    params;
  const dispatch = useDispatch();
  dispatch(setTourId(null));

  const [isLoading, setIsLoading] = useState(false);
  const [statusState, setStatusState] = useState(status);

  const handleStatus = async (value: string) => {
    console.log(value);

    if (statusState === value) {
      return;
    }

    // const statusData = e.currentTarget.name;
    setIsLoading(true);

    try {
      // const patchData = { tourID, status: value };
      const patchData = { tourID, status: value, guideId };

      const res = await fetch("/api/guide/activity/updateBookingStatus", {
        method: "PATCH",
        body: JSON.stringify(patchData),
      });
      const data = await res.json();
      console.log(data);
      setStatusState(data.updateQuery.status);
      toast.success(`Status changed: ${data.updateQuery.status}`);
    } catch (err) {
      console.log("ERROR in status upadte in guide side: ", err);
      toast.error(`Error in changing Status`);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full comp-bg p-4  rounded-2xl">
      <div className="grid grid-cols-[3fr_1fr] ">
        <div>
          <div className="flex gap-4">
            <div
              className={`flex gap-2 items-center  rounded-xl text-sm p-1 ${
                statusState == "ACCEPTED"
                  ? "bg-green-200"
                  : statusState == "PENDING"
                    ? "bg-amber-200"
                    : "bg-red-200"
              } `}
            >
              <div
                className={`w-4 h-4  rounded-xl text-sm p-1 ${
                  statusState == "ACCEPTED"
                    ? "bg-green-500"
                    : statusState == "PENDING"
                      ? "bg-amber-400"
                      : "bg-red-500"
                } rounded-full `}
              ></div>
              APPROVAL {statusState}
            </div>
            <div>posted 2 hr ago</div>
          </div>
          <h2 className=" whitespace-break-spaces">{location}</h2>
        </div>

        <div className="flex gap-4  items-center justify-end">
          <div className="flex flex-col items-center">
            <label>Total</label>
            <h2>${price}</h2>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex   justify-between">
        <div className="flex gap-8  items-center">
          <Calendar className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" />
          <div>
            <label>Date</label>
            <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
              {date}
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <Clock4 className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" />
          <div>
            <label>Start Time</label>
            <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
              {startTime}
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <Hourglass className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" />
          <div>
            <label>Duration</label>
            <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
              {duration} Hrs
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          {/* <Hourglass className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" />
          <div>
            <label>Duration</label>
            <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
              {duration} Hrs
            </div>
          </div> */}
          {role == "guide" ? (
            isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : (
              // <div className="flex gap-4 mx-2">
              //   <button
              //     name="REJECTED"
              //     onClick={handleStatus}
              //     className={`${
              //       "text-white bg-red-600"
              //       //   theme == "light"
              //       //   ? "text-black comp-bg"
              //       //   : "text-white comp-bg"
              //     } min-w-28 rounded-xl hover:cursor-pointer p-2 ${
              //       status !== "PENDING" ? "block" : "hidden"
              //     } `}
              //   >
              //     <div className="flex gap-2">
              //       <X />
              //       <>Reject</>
              //     </div>
              //   </button>
              //   <button
              //     name="ACCEPTED"
              //     onClick={handleStatus}
              //     className={`${
              //       "text-white bg-green-700"
              //       //   theme == "light"
              //       //   ? "text-black comp-bg"
              //       //   : "text-white comp-bg"
              //     } min-w-28 rounded-xl hover:cursor-pointer p-2  ${
              //       status !== "PENDING" ? "block" : "hidden"
              //     } `}
              //   >
              //     <div className="flex gap-2">
              //       <Check />
              //       <>Accept</>
              //     </div>
              //   </button>
              // </div>
              <select
                name="status"
                onChange={(ele) => handleStatus(ele.target.value)}
                // onChange={((ele))}
                // value={statusState}
                className="cursor-pointer border p-1 rounded-md"
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  Change Status
                </option>

                <option value="ACCEPTED">ACCEPTED</option>

                <option value="REJECTED">REJECTED</option>
              </select>
            )
          ) : (
            <div>{statusState}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpperPart;
