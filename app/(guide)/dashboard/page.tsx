import GuideCards from "./guide-cards";
import UpcomingTours from "./upcoming-tours";
import RecentActivityComp from "./recent-activity";
import IntroPart from "./intro-part";

const page = () => {
  return (
    <div className="mx-8">
      <IntroPart />

      <GuideCards />

      <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
        <UpcomingTours />
        <RecentActivityComp />
      </div>
    </div>
  );
};

export default page;
