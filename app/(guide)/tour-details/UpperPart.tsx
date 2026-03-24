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
    <div
      className={` comp-bg p-4 rounded-2xl  border-l-4 ${
        statusState == "ACCEPTED"
          ? "border-l-green-500"
          : statusState == "PENDING"
            ? "border-l-amber-500"
            : "border-l-red-500"
      } `}
    >
      <div className="flex gap-4">
        <div
          className={`flex gap-2 items-center  rounded-xl text-[clamp(0.5rem,3vw+0.1rem,0.7rem)] p-0.5 ${
            statusState == "ACCEPTED"
              ? "bg-green-200"
              : statusState == "PENDING"
                ? "bg-amber-200"
                : "bg-red-200"
          } `}
        >
          <div
            className={`w-2 h-2  rounded-xl text-sm p-1 ${
              statusState == "ACCEPTED"
                ? "bg-green-500"
                : statusState == "PENDING"
                  ? "bg-amber-400"
                  : "bg-red-500"
            } rounded-full `}
          ></div>
          APPROVAL {statusState}
        </div>
      </div>
      {/* <div className="grid gap-2 grid-cols-[1fr_2fr] mt-2 place-items-start"> */}
      <div className="flex gap-2 mt-2 place-items-start">
        <div className="  mt-2  sm:w-min flex justify-center ">
          <Calendar size={64} />
        </div>
        {/* <div>
          <h2 className=" whitespace-break-spaces">{location}</h2>

          <div>posted 2 hr ago</div>
        </div> */}

        <div className="">
          <div className=" mt-2 text-[clamp(1.9rem,3vw+0.2rem,2rem)] whitespace-break-spaces leading-tight font-bold">
            {location}
          </div>

          <div className="mt-2 leading-tight">
            <div className=" text-gray-500 ">TOTAL</div>
            <div className="text-bold text-[clamp(2rem,3vw+0.5rem,4rem)] text-orange-700 font-semibold">
              ${price}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-[3fr_1fr] border">
        <div>
          <div className="flex gap-4">
            <div
              className={`flex gap-2 items-center  rounded-xl text-[clamp(0.5rem,3vw+0.1rem,0.7rem)] p-0.5 ${
                statusState == "ACCEPTED"
                  ? "bg-green-200"
                  : statusState == "PENDING"
                    ? "bg-amber-200"
                    : "bg-red-200"
              } `}
            >
              <div
                className={`w-2 h-2  rounded-xl text-sm p-1 ${
                  statusState == "ACCEPTED"
                    ? "bg-green-500"
                    : statusState == "PENDING"
                      ? "bg-amber-400"
                      : "bg-red-500"
                } rounded-full `}
              ></div>
              APPROVAL {statusState}
            </div>
          </div>

          <h2 className=" whitespace-break-spaces">{location}</h2>
          
          <div>posted 2 hr ago</div>
        </div>

        <div className="flex gap-4  items-center justify-end">
          <div className="flex flex-col items-center">
            <label>Total</label>
            <div className="text-bold text-[clamp(2rem,3vw+0.5rem,4rem)]">
              ${price}
            </div>
          </div>
        </div>
      </div> */}

      <hr className="my-4 border border-gray-200" />

      <div className="flex flex-wrap gap-4 justify-between sm:justify-start  w-full ">
        <div className="flex gap-4  items-center">
          <div className=" p-2 rounded-2xl ele-bg hover:cursor-pointer  ">
            <Calendar size={20} />
          </div>
          <div>
            <label>Date</label>
            <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
              {date}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between  w-full ">
          <div className="flex gap-4 items-center ">
            {/* <Clock4 className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" /> */}
            <div className=" p-2 rounded-2xl ele-bg hover:cursor-pointer  ">
              <Clock4 size={20} />
            </div>
            <div>
              <label>Start Time</label>
              <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
                {startTime}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center ">
            {/* <Hourglass className="h-12 w-12 p-2 rounded-full ele-bg hover:cursor-pointer" />
             */}

            <div className=" p-2 rounded-2xl ele-bg hover:cursor-pointer  ">
              <Hourglass size={20} />
            </div>
            <div>
              <label>Duration</label>
              <div className="text-xl font-semibold text-[hsl(0,0%,15%)]">
                {duration} Hrs
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          {role == "guide" &&
            (isLoading ? (
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
            ))}
        </div>
      </div>
    </div>

    // <div className=" comp-bg p-4 border border-red-500 rounded-2xl ">asd</div>
  );
};

export default UpperPart;

// evalutaion letter

// about company : guys has writeen (authrized capital of Rs. 20 Million and an issued capital of Rs. 12 Million.),
//   working structured, people involved, hierachy, .
//   in infosys webiste, testo ramri chaina CEO and CTo ko kasko under ma testo chiina, just dev, businerss head yini harucha

//   ani core product ma k rakhda hola ? kasto type ko product vanera?

//   ani mailey euta MERN ma tourist ra guide lai conenct garni website (like pathao but for guide and tourist)
//    BanknoteArrowDown, ame guideBudyy,
//   tesko barema vanda thik hola hai Sir, i could say it is still in dev vanera ?
