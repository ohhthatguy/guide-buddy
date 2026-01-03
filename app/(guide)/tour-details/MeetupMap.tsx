import ClientSideMeetupMap from "@/component/Map/clientSideMeetupMap/ClientSideMeetupMap";
import { Radar } from "lucide-react";
const MeetupMap = async ({
  meetupCords,
}: {
  meetupCords: [number, number];
}) => {
  // console.log(meetupCords);
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${meetupCords[0]}&lon=${meetupCords[1]}`
    );

    const data = await response.json();
    // console.log(data);

    return (
      <div className="comp-bg p-4 max-w-4xl min-w-xl ">
        <div className="flex gap-4 items-center">
          <h4>Meeting Point</h4>
        </div>

        <div className="flex gap-4  p-4 ele-bg my-4 items-center rounded-md">
          <Radar className="fill-blue-500 " />
          <div>
            <div className="text-xl">
              {data.address.village}, {data.address.state}{" "}
            </div>
            <div className="">
              {data.display_name}. Please be at least 15min early
            </div>
          </div>
        </div>

        <div className="">
          <ClientSideMeetupMap meetupCord={meetupCords} />
        </div>
      </div>
    );
  } catch (err) {
    console.log("Error in meetupmap component: ", err);
  }
};

export default MeetupMap;
