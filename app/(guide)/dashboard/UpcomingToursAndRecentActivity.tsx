import UpcomingTours from "./upcoming-tours";
import RecentActivityComp from "./recent-activity";
import TourModel from "@/lib/database/Model/Tour";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";
import { paginationWithoutSkip } from "@/lib/helper/pagination";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";

const getData = async (page: string) => {
  try {
    await connectDB();

    const tokenData = await getTokenData("token");

    if (!tokenData) {
      console.log(
        "getTokenData() has bugs, check it in helper function. Error at upcoming-tour page of guide",
      );
      throw new Error(
        "Failed to get token data in UpcomingToursAndRecentActivity component ",
      );
    }

    const { id } = tokenData;
    console.log(id);

    const TourItemCount = await TourModel.countDocuments({});
    console.log("YOUR ITEM COUNT: ", TourItemCount);

    const pagLimit = paginationWithoutSkip(Number(page));

    const guide = await GuideModel.findOne({ guideId: id });
    if (!guide) throw new Error("Guide not found");
    const tour = await TourModel.find({
      "guide.id": guide._id.toString(),
    }).limit(pagLimit);

    console.log("PAGELIMIT AT UPCMONG: ", pagLimit);

    if (!tour || tour.length === 0) {
      console.log("No tours found for this guide");
      // You can return an empty array instead of notFound()
      // so the UI doesn't crash
      return { serializedTour: [], id };
    }

    let serializedTour = JSON.parse(JSON.stringify(tour));

    console.log("upcoming tour: ", serializedTour);

    // const dummySerializedTour = [
    //   {
    //     guide: { id: "695aaa3c5a9f04fab8f97ff8", name: "guide dai" },
    //     client: { id: "695de8154bcc2df500f49e01", name: "Sarah Jenkins" },
    //     time: { startTime: "08:00", endTime: "12:00" },
    //     meetup_location: { type: "Point", coordinates: [85.324, 27.717] },
    //     _id: "695de85c4bcc2df500f49e10",
    //     date: "2026-01-12",
    //     duration: "4",
    //     price: 80,
    //     location: "Kathmandu Durbar Square",
    //     guideNote: "Client requested history-focused tour.",
    //     status: "ACCEPTED",
    //     createdAt: "2026-01-08T09:30:00.000Z",
    //     updatedAt: "2026-01-09T14:20:00.000Z",
    //     __v: 0,
    //   },
    //   {
    //     guide: { id: "695aaa3c5a9f04fab8f97ff8", name: "guide dai" },
    //     client: { id: "695df1204bcc2df500f49f55", name: "Michael Chen" },
    //     time: { startTime: "14:00", endTime: "17:00" },
    //     meetup_location: { type: "Point", coordinates: [85.3, 27.67] },
    //     _id: "695df14a4bcc2df500f49f62",
    //     date: "2026-01-15",
    //     duration: "3",
    //     price: 45,
    //     location: "Patan Art Gallery",
    //     guideNote: "Photographer client - wants golden hour shots.",
    //     status: "PENDING",
    //     createdAt: "2026-01-09T18:15:24.484Z",
    //     updatedAt: "2026-01-09T18:15:24.484Z",
    //     __v: 0,
    //   },
    //   {
    //     guide: { id: "695aaa3c5a9f04fab8f97ff8", name: "guide dai" },
    //     client: { id: "695e02a14bcc2df500f50a12", name: "Elena Rodriguez" },
    //     time: { startTime: "05:00", endTime: "09:00" },
    //     meetup_location: { type: "Point", coordinates: [85.34, 27.7] },
    //     _id: "695e02bd4bcc2df500f50a25",
    //     date: "2026-01-20",
    //     duration: "4",
    //     price: 120,
    //     location: "Nagarkot Sunrise Point",
    //     guideNote: "Pick up from hotel required.",
    //     status: "ACCEPTED",
    //     createdAt: "2026-01-10T04:10:12.112Z",
    //     updatedAt: "2026-01-10T06:45:00.000Z",
    //     __v: 0,
    //   },
    //   {
    //     guide: { id: "695aaa3c5a9f04fab8f97ff8", name: "guide dai" },
    //     client: { id: "695f11334bcc2df500f51b08", name: "John Smith" },
    //     time: { startTime: "11:00", endTime: "16:00" },
    //     meetup_location: { type: "Point", coordinates: [85.28, 27.72] },
    //     _id: "695f115e4bcc2df500f51c01",
    //     date: "2026-01-22",
    //     duration: "5",
    //     price: 150,
    //     location: "Swayambhunath Temple",
    //     guideNote: "Family of four.",
    //     status: "REJECTED",
    //     createdAt: "2026-01-05T12:00:00.000Z",
    //     updatedAt: "2026-01-06T09:00:00.000Z",
    //     __v: 0,
    //   },
    //   {
    //     guide: { id: "695aaa3c5a9f04fab8f97ff8", name: "guide dai" },
    //     client: { id: "696a12004bcc2df500f52d99", name: "Yuki Tanaka" },
    //     time: { startTime: "10:00", endTime: "13:00" },
    //     meetup_location: { type: "Point", coordinates: [85.312, 27.705] },
    //     _id: "696a122c4bcc2df500f52e12",
    //     date: "2026-01-25",
    //     duration: "3",
    //     price: 60,
    //     location: "Boudhanath Stupa",
    //     guideNote: "Wants to visit a local monastery.",
    //     status: "PENDING",
    //     createdAt: "2026-01-10T15:20:00.000Z",
    //     updatedAt: "2026-01-10T15:20:00.000Z",
    //     __v: 0,
    //   },
    // ];
    // serializedTour = [...serializedTour, ...dummySerializedTour];
    return { serializedTour, id, TourItemCount, pagLimit };
  } catch (err) {
    console.log(
      "Failed to fetch upcoming-tour data in UpcomingToursAndRecentActivity component from database",
      err,
    );
    throw new Error(
      "Failed to fetch upcoming-tour data in UpcomingToursAndRecentActivity component from database",
    );
  }
};

const UpcomingToursAndRecentActivity = async ({ page }: { page: string }) => {
  const {
    serializedTour,
    id,
    TourItemCount = 0,
    pagLimit,
  } = await getData(page);

  return (
    <div className="grid grid-cols-[2fr_1fr]  items-start mt-4 gap-4  ">
      {!serializedTour || serializedTour.length === 0 ? (
        <p>No recent activity</p>
      ) : (
        <>
          <UpcomingTours
            serializedTour={serializedTour}
            TourItemCount={TourItemCount}
          />
          <RecentActivityComp
            serializedTour={serializedTour}
            id={id}
            // pagLimit={pagLimit}
          />
        </>
      )}
    </div>
  );
};

export default UpcomingToursAndRecentActivity;
