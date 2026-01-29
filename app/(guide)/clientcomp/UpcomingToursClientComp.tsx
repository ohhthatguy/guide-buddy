"use client";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setTourId } from "@/lib/feature/guide/upcomingAndRecentTourConnection";
import type { TourDataType } from "../guide-profile/type/type";
import { useSearchParams, usePathname } from "next/navigation";
import { isFinalPage } from "@/lib/helper/pagination";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UpcomingToursClientComp = ({
  e,
  index,
  length,
  TourItemCount,
  serializedTour,
}: {
  e: TourDataType;
  index: number;
  length: number;
  TourItemCount: number;
  serializedTour: TourDataType[];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedTourId = useSelector(
    (state: any) => state.upcomingAndRecentTourConnection.tourId,
  );
  // console.log("ID SELECTED:", selectedTourId);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get("page"));

  const createPageURL = () => {
    const params = new URLSearchParams(searchParams.toString());
    const pageNumber = Number(page) + 1;
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    const isSelectedTourLoaded = serializedTour.find(
      (ele) => ele._id === selectedTourId,
    );
    if (selectedTourId && !isSelectedTourLoaded) {
      router.push(
        `/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&clientName=${e.client.name}&clientId=${e.client.id}&tourID=${e._id}`,
      );
    }

    if (selectedTourId && isSelectedTourLoaded) {
      // Look for the element by its HTML ID attribute
      const element = document.getElementById(`tour-${selectedTourId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (page > 1) {
      const element = document.getElementById(`next-page-link`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    console.log("SECLECTED TOUR ID: ", selectedTourId);
  }, [selectedTourId]);

  const handlePageChange = () => {
    dispatch(setTourId(null));
  };

  return (
    <>
      {" "}
      {e ? (
        <div
          id={`tour-${e._id}`}
          key={index}
          className={` 
        transition-all duration-500 transform
        ${
          e._id === selectedTourId
            ? "scale-[1.02] shadow-xl border-blue-500 "
            : "scale-100 border-transparent"
        }
       border-2 rounded-lg 
      `}
        >
          <Link
            href={`/tour-details?location=${e.location}&price=${e.price}&date=${e.date}&duration=${e.duration}&startTime=${e.time.startTime}&status=${e.status}&meetup=${e.meetup_location.coordinates}&clientName=${e.client.name}&clientId=${e.client.id}&tourID=${e._id}`}
            className={` ${
              e._id === selectedTourId && " border-blue-500"
            } grid grid-cols-[5%_95%] p-4  gap-4 mb-4 rounded-md ele-bg hover:cursor-pointer  hover:shadow-md shadow-xs hover:scale-[1.01] scale-100 transition-all duration-500`}
          >
            <div>
              <Calendar size={44} className="p-2 rounded-md comp-bg" />
            </div>

            <div className="grid gap-1 px-4">
              <div className="flex justify-between ">
                <div className="font-semibold">{e.location}</div>
                <div className="font-medium">{e.price}</div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div>
                    <div>{e.client.name}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                      {" "}
                      <Calendar size={18} />{" "}
                      <div>
                        {e.date} at {e.time.startTime}
                      </div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {" "}
                      <Clock size={18} /> <div>{e.duration} hours</div>
                    </div>

                    <div className="flex gap-1 items-center">
                      {" "}
                      <MapPin size={18} /> <div>{e.location}</div>
                    </div>
                  </div>
                </div>

                {/* <BookingStatus e={e} /> */}
                <div
                  className={`border rounded-xl text-sm p-1 ${
                    e.status == "ACCEPTED"
                      ? "bg-green-500"
                      : e.status == "PENDING"
                        ? "bg-amber-400"
                        : "bg-red-500"
                  }`}
                >
                  {e.status}
                </div>
              </div>
            </div>
          </Link>

          {!isFinalPage(page, TourItemCount) && length - 1 == index && (
            <div
              className=" text-center"
              onClick={handlePageChange}
              // id="next-page-link"
            >
              <Link className="text-blue-600 underline" href={createPageURL()}>
                More
              </Link>
            </div>
          )}
          {length - 1 == index && <div id="next-page-link"></div>}
        </div>
      ) : (
        <>
          <div className="h-full w-full rounded-xl bg-slate-200"></div>
        </>
      )}
    </>
  );
};

export default UpcomingToursClientComp;
