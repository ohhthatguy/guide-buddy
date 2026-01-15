import UpperPart from "./UpperPart";
import MeetupMap from "./MeetupMap";
import ClientPart from "./ClientPart";
import NotePart from "./NotePart";
import { notFound } from "next/navigation";
import ReviewSection from "./Review-section";
import TourModel from "@/lib/database/Model/Tour";

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
      clientName,
      clientId
    );

    const tokenData = await getTokenData("token");
    if (!tokenData) {
      console.log("getTokenData() has bugs, check it in helper function");
      return notFound();
    }

    const { role } = tokenData;
    let data;
    if (role == "customer") {
      //customer ma guide done
      data = await TourModel.findOne({ _id: tourID })
        .populate({
          path: "guide.id",
          select: "phone languages profileURL",
          populate: {
            path: "guideId",
            select: "email",
          },
        })
        .lean();
    } else {
      //guide ma customer baki
      data = await TourModel.findOne({ _id: tourID })
        .populate({
          path: "client.id",
          select: "phone languages profileURL",
          populate: {
            path: "clientId",
            select: "email",
          },
        })
        .lean();
    }

    console.log(data);
    const guideId = data?.guide.id?._id?.toString();
    console.log(guideId);
    const name = role === "guide" ? data?.client.name : data?.guide.name;
    const email =
      role === "guide"
        ? data?.client.id?.clientId.email
        : data?.guide.id?.guideId.email;

    const phone =
      role === "guide" ? data?.client.id.phone : data?.guide.id?.phone;
    const url =
      role === "guide"
        ? data?.client.id.profileURL
        : data?.guide.id?.profileURL;
    const languages =
      role === "guide" ? data?.client.id.languages : data?.guide.id?.languages;

    return (
      <div className="m-8">
        <UpperPart
          params={params}
          role={role as "guide" | "client"}
          guideId={guideId}
        />
        {/* <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
          <MeetupMap meetupCords={meetupCordsFinal as [number, number]} />
          <div className="grid grid-rows-[2fr_1fr] gap-4">
            <NotePart
              tourID={tourID as string}
              role={role as "guide" | "client"}
            />
            <div className="border">asd</div>
          </div>
        </div>

        <ClientPart role={role} tourID={tourID as string} /> */}

        <div className="grid grid-cols-[2fr_1fr] mt-4 gap-4">
          <div>
            <MeetupMap meetupCords={meetupCordsFinal as [number, number]} />
            <ClientPart
              name={name as string}
              email={email}
              phone={phone}
              url={url}
              languages={languages}
            />
          </div>

          <div
            className={`grid ${
              role === "customer" && "grid-rows-[1.5fr_1fr]"
            } gap-4`}
          >
            <NotePart
              tourID={tourID as string}
              role={role as "guide" | "client"}
            />
            {role === "customer" && (
              <ReviewSection
                clientId={clientId as string}
                guideId={guideId as string}
              />
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error in getting the Tour detail page: ", error);
  }
};

export default page;
