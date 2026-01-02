import { Check, X, Calendar, Clock4, Hourglass } from "lucide-react";

const UpperPart = ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) => {
  const { location, price, meetup, tourID, status, startTime, duration, date } =
    params;

  return (
    <div className="w-full comp-bg p-4  rounded-2xl">
      <div className="grid grid-cols-[3fr_1fr] ">
        <div>
          <div className="flex gap-4">
            <div
              className={`flex gap-2 items-center  rounded-xl text-sm p-1 ${
                status == "ACCEPTED"
                  ? "bg-green-200"
                  : status == "PENDING"
                  ? "bg-amber-200"
                  : "bg-red-200"
              } `}
            >
              <div
                className={`w-4 h-4  rounded-xl text-sm p-1 ${
                  status == "ACCEPTED"
                    ? "bg-green-500"
                    : status == "PENDING"
                    ? "bg-amber-400"
                    : "bg-red-500"
                } rounded-full `}
              ></div>
              APPROVAL {status}
            </div>
            <div>posted 2 hr ago</div>
          </div>
          <h2 className=" whitespace-break-spaces">
            {location} Lorem ipsum dolor sit amet.
          </h2>
        </div>

        <div className="flex gap-4 border items-center">
          <div className="flex flex-col items-center">
            <label>Total</label>
            <h2>${price}</h2>
          </div>
          <button
            className={`${
              "text-white bg-blue-700"
              //   theme == "light"
              //   ? "text-black comp-bg"
              //   : "text-white comp-bg"
            } min-w-28 rounded-xl hover:cursor-pointer p-2  `}
          >
            <div className="flex gap-2">
              <X />
              <>Decline</>
            </div>
          </button>
          <button
            className={`${
              "text-white bg-blue-700"
              //   theme == "light"
              //   ? "text-black comp-bg"
              //   : "text-white comp-bg"
            } min-w-28 rounded-xl hover:cursor-pointer p-2  `}
          >
            <div className="flex gap-2">
              <Check />
              <>Accept</>
            </div>
          </button>
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
      </div>
    </div>
  );
};

export default UpperPart;
