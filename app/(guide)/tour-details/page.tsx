import UpperPart from "./UpperPart";
import MeetupMap from "./MeetupMap";
import ClientPart from "./ClientPart";
import NotePart from "./NotePart";
import { notFound } from "next/navigation";

import { getTokenData } from "@/lib/helper/useGetDataFromToken";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const params = await searchParams;
    const {
      location,
      price,
      meetup,
      tourID,
      status,
      startTime,
      duration,
      clientName,
      clientId,
    } = params;
    // Convert meetup back to an array for your Map
    const dataCords = meetup
      ? (meetup as string).split(",").map(Number)
      : [0, 0];
    const meetupCordsFinal: [number, number] = [dataCords[1], dataCords[0]];

    console.log(
      location,
      price,
      meetup,
      tourID,
      status,
      startTime,
      duration,
      meetupCordsFinal,
      clientName
    );

    const tokenData = await getTokenData("token");
    if (!tokenData) {
      console.log("getTokenData() has bugs, check it in helper function");
      return notFound();
    }

    const { role } = tokenData;

    return (
      <div className="m-8">
        <UpperPart params={params} role={role} />
        <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
          <MeetupMap meetupCords={meetupCordsFinal as [number, number]} />
          <NotePart tourID={tourID} role={role} />
        </div>

        <ClientPart role={role} tourID={tourID} />
      </div>
    );
  } catch (error) {
    console.log("Error in getting the Tour detail page: ", error);
  }
};

export default page;
