import GuideCards from "./guide-cards";
import IntroPart from "./intro-part";
// import UpcomingTours from "./upcoming-tours";
// import RecentActivityComp from "./recent-activity";
import UpcomingToursAndRecentActivity from "./UpcomingToursAndRecentActivity";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const { page } = params;
  return (
    <div className="mx-8">
      <IntroPart />

      <GuideCards />

      <UpcomingToursAndRecentActivity page={page} />

      {/* <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
        <UpcomingTours />
        <RecentActivityComp />
      </div> */}
    </div>
  );
};

export default page;
