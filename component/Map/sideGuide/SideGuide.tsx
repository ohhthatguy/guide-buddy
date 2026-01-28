import type {
  PopulatedGuideNameFromDB,
  MongoId,
} from "@/app/(guide)/guide-profile/type/type";
import { Star } from "lucide-react";

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
    <div className="min-w-0 overflow-hidden ele-bg grid grid-rows-[3fr_2fr_1fr_4fr_1fr]">
      <div className="  py-2">
        <div
          className="text-end px-4 mt-4 cursor-pointer"
          onClick={() => setOpenSide(false)}
        >
          X
        </div>
        <div className="flex justify-center rounded-full items-center">
          <img src={imgURL} className="h-44 w-44 object-cover rounded-full  " />
        </div>
      </div>
      <div className="border-2 felx justify-center items-center">
        <p>{selectedSideGuide?.guideId.name}</p>
        <p>
          <Star /> {selectedSideGuide?.rating}
        </p>
      </div>
      <div className="border-2">stat</div>
      <div className="border-2">detail</div>
      <div className="border-2">book</div>
    </div>
  );
};

export default SideGuide;
