import UpperPart from "./UpperPart";
import MeetupMap from "./MeetupMap";
import ClientPart from "./ClientPart";
import NotePart from "./NotePart";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const { location, price, meetup, tourID, status, startTime, duration } =
    params;
  // Convert meetup back to an array for your Map
  const dataCords = meetup ? (meetup as string).split(",").map(Number) : [0, 0];
  const meetupCordsFinal: [number, number] = [dataCords[1], dataCords[0]];

  console.log(
    location,
    price,
    meetup,
    tourID,
    status,
    startTime,
    duration,
    meetupCordsFinal
  );

  return (
    <div className="m-8">
      <UpperPart params={params} />
      <div className="">
        <MeetupMap meetupCords={meetupCordsFinal as [number, number]} />
        <NotePart />
      </div>
      <ClientPart />
    </div>
  );
};

export default page;
