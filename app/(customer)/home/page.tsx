import SearchBox from "../component/SearchBox";
import Map from "@/component/Map/MapWrapper";
import GuideCard from "../component/GuideCard";
import connectDB from "@/lib/database/database";
import GuideModel from "@/lib/database/Model/Guide";
// import { PopulatedGuideNameFromDB } from "@/app/(guide)/guide-profile/type/type";

const getAllGuide = async () => {
  try {
    await connectDB();
    // Fetch directly from MongoDB
    const res = await GuideModel.find({ available: true })
      .populate("guideId", "name")
      .lean();
    const data = JSON.parse(JSON.stringify(res));
    console.log(data);

    return data; // Ensure it's plain objects
  } catch (error) {
    console.error("Error fetching guides at getallguide():", error);
    return [];
  }
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | "list" | "map";
  }>;
}) => {
  type viewtype = "list" | "map";

  const data = await getAllGuide();
  if (!data) {
    console.log("DATA AT getAllGuide(): ", data);
    throw new Error("DATA FROM getAllGuide() is not found");
  }
  let { view } = await searchParams;

  if (!view) {
    view = "map";
  }

  console.log(data);

  return (
    <div className="mx-8">
      <SearchBox selectedView={view} searchParams={searchParams} />
      {view == "list" ? (
        <GuideCard activeGuides={data} />
      ) : (
        <Map activeGuides={data} />
      )}
    </div>
  );
};

export default page;
