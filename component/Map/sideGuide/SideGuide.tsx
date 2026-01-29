import type {
  PopulatedGuideNameFromDB,
  MongoId,
} from "@/app/(guide)/guide-profile/type/type";
import { Star } from "lucide-react";
import Link from "next/link";

const SideGuide = ({
  setOpenSide,
  selectedSideGuide,
}: {
  setOpenSide: any;
  selectedSideGuide: PopulatedGuideNameFromDB | undefined;
}) => {
  console.log(selectedSideGuide);

  const imgURL = selectedSideGuide?.profileURL
    ? selectedSideGuide.profileURL
    : "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    // h-[91vh]
    // <div className="h-screen border-2 flex flex-col justify-end">
    <div className="h-screen min-h-0 relative overflow-hidden grid grid-rows-[2fr_1fr_5fr]">
      <div className=" ele-bg min-h-35   flex flex-col justify-end">
        <div
          className="cursor-pointer absolute left-0 top-10 sm:top-13 text-xs underline text-blue-500"
          onClick={() => setOpenSide(false)}
        >
          BACK TO MAP
        </div>
        <div className="flex  justify-around  items-center  py-2">
          <div className=" flex justify-between px-4 items-center ">
            <div className="text-xl flex flex-col  font-semibold">
              <p>{selectedSideGuide?.guideId.name}</p>
              <div className="flex items-center ">
                {[1, 2, 3, 4, 5].map((e, index) => (
                  <Star
                    key={index}
                    // className={`${(selectedSideGuide?.rating ?? 0 >= e) ? "fill-yellow-400" : ""}`}
                    className={`${(selectedSideGuide?.rating ?? 0) >= e ? "fill-yellow-400" : ""}`}
                    size={13}
                  />
                ))}
              </div>
            </div>
          </div>

          <img src={imgURL} className="h-20 w-20 object-cover rounded-full  " />
        </div>

        {/* <div className="border flex justify-between px-4 items-center ">
          <div className="text-xl flex flex-col  font-semibold">
            <p>{selectedSideGuide?.guideId.name}</p>
            <div className="flex items-center ">
              {[1, 2, 3, 4, 5].map((e, index) => (
                <Star
                  key={index}
                  // className={`${(selectedSideGuide?.rating ?? 0 >= e) ? "fill-yellow-400" : ""}`}
                  className={`${(selectedSideGuide?.rating ?? 0) >= e ? "fill-yellow-400" : ""}`}
                  size={13}
                />
              ))}
            </div>
          </div>

          <div className="cursor-pointer " onClick={() => setOpenSide(false)}>
            X
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-[1fr_2fr_1fr] ">
        <div className="flex flex-col justify-center items-center ">
          <p className="text-md font-bold">
            {selectedSideGuide?.toursCompleted}
          </p>
          <p className="text-xs opacity-85">TOURS</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-md font-bold">{selectedSideGuide?.experience}</p>
          <p className="text-xs opacity-85">EXP. YEARS</p>
        </div>

        <div className="flex flex-col justify-center items-center ">
          <p className="text-md font-bold">${selectedSideGuide?.hourlyRate}</p>
          <p className="text-xs opacity-85">RATE /HR</p>
        </div>
      </div>

      <div className="grid grid-rows-[min-content_1fr] min-h-0  ">
        <div className=" min-h-0 max-h-fit p-2 ">
          <p className="font-semibold">ABOUT</p>
          <p className=" text-sm overflow-auto max-h-30 p-2 min-h-30">
            {selectedSideGuide?.bio}
          </p>
        </div>

        <div className=" flex flex-col  gap-4 ">
          <div className="grid grid-cols-2 min-h-0 gap-4 ">
            <div className="min-h-0 max-h-fit ">
              <p className="font-semibold capitalize p-2">Langauges</p>
              <div className=" min-h-20 max-h-30  overflow-auto">
                {selectedSideGuide?.languages.map((e, index) => (
                  <div className="flex gap-2 items-center px-2 " key={index}>
                    <p className="bg-blue-500 w-2 h-2 rounded-full"></p>
                    <p className="text-sm">{e}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-0 max-h-fit ">
              <p className="font-semibold capitalize p-2">certificate</p>

              <div className="flex flex-wrap  gap-1 items-center min-h-0 max-h-30 overflow-auto">
                {selectedSideGuide?.certifications.map((e, index) => (
                  <p key={index} className="comp-bg rounded-md p-2 text-sm">
                    {e}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full text-center">
            <Link
              href={`/guide-profile/${selectedSideGuide?._id}?page=1`}
              className="inline-flex items-center justify-center rounded-xl h-10 px-4 w-8/12 bg-blue-500 text-white font-medium transition-colors hover:bg-blue-600 active:bg-blue-700"
            >
              Click me
            </Link>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SideGuide;
