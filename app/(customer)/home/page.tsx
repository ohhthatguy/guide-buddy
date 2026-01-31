import SearchBox from "../component/SearchBox";
// import Map from "@/component/Map/MapWrapper";
// import GuideCard from "../component/GuideCard";
// import connectDB from "@/lib/database/database";
// import GuideModel from "@/lib/database/Model/Guide";
// import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
import GuideCardAndMapClientComp from "./GuideCardAndMapClientComp";
// import { PopulatedGuideNameFromDB } from "@/app/(guide)/guide-profile/type/type";

// const getAllGuide = async () => {
//   try {
//     await connectDB();
//     // Fetch directly from MongoDB
//     const position = useGetCurrentPosition();

//     const res = await GuideModel.find({ available: true })
//       .populate("guideId", "name")
//       .lean();
//     const data = JSON.parse(JSON.stringify(res));
//     console.log(data);

//     return data; // Ensure it's plain objects
//   } catch (error) {
//     console.error("Error fetching guides at getallguide():", error);
//     return [];
//   }
// };

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: "list" | "map";
  }>;
}) => {
  // type viewtype = "list" | "map";

  // const data = await getAllGuide();
  // if (!data) {
  //   console.log("DATA AT getAllGuide(): ", data);
  //   throw new Error("DATA FROM getAllGuide() is not found");
  // }
  let { view, id } = await searchParams;
  console.log(id);
  if (!view) {
    view = "map";
  }

  // console.log(data);

  return (
    <div className="">
      <GuideCardAndMapClientComp selectedView={view} />
      {/* <SearchBox selectedView={view} id={id} /> */}
    </div>
  );
};

export default page;
