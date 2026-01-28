"use client";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useRouter } from "next/navigation";
import type {
  PopulatedGuideNameFromDB,
  MongoId,
} from "@/app/(guide)/guide-profile/type/type";

const MapMarker = ({
  currentUserPos,
  activeGuides,
  openGuideSide,
}: {
  currentUserPos: [number, number];
  activeGuides: PopulatedGuideNameFromDB[];
  openGuideSide: any;
}) => {
  const [lat, lon] = currentUserPos;
  const router = useRouter();

  type GuideMarker = {
    id: number | MongoId;
    name: string;
    profileURL: string; // image URL
    position: [number, number];
    //distance far from customer
  };

  // const demoUserGuide: GuideMarker[] = [
  //   {
  //     id: 1,
  //     name: "First Name",
  //     profileURL: "https://randomuser.me/api/portraits/men/32.jpg",
  //     position: [lat + 0.1, lon + 0.1],
  //   },

  //   // {
  //   //   id: 4,
  //   //   name: "First Name",
  //   //   profile: "https://randomuser.me/api/portraits/men/32.jpg",
  //   //   position: [lat + 0.0001, lon + 0.0001],
  //   // },

  //   {
  //     id: 2,
  //     name: "Second Name",
  //     profileURL: "https://randomuser.me/api/portraits/women/45.jpg",
  //     position: [lat + 0.1, lon - 0.1],
  //   },
  //   {
  //     id: 3,
  //     name: "Third Name",
  //     profileURL: "https://randomuser.me/api/portraits/men/76.jpg",
  //     position: [lat - 0.1, lon - 0.1],
  //   },
  // ];

  console.log("ACTIVE GUIDES: ", activeGuides);

  const realUserGuide: GuideMarker[] = activeGuides?.map(
    (e: PopulatedGuideNameFromDB) => {
      return {
        id: e._id,
        name: e.name || "default",
        profileURL:
          e.profileURL ||
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        position: [
          e.location.coordinates[1] || 0,
          e.location.coordinates[0] || 0,
        ],
      };
    },
  );
  // const userGuide: GuideMarker[] = [...demoUserGuide, ...realUserGuide];

  const userGuide: GuideMarker[] = [...realUserGuide];

  console.log("Guides on map: ", activeGuides);
  console.log("customer current location: ", currentUserPos);

  const alteredCurrentPos: [number, number] = [
    currentUserPos[0] + 0.0001,
    currentUserPos[1] + 0.0001,
  ];

  return (
    <div>
      {" "}
      {/* current User (customer) */}
      {/* <Marker position={currentUserPos}> */}
      <Marker position={alteredCurrentPos}>
        <Popup>
          Current User Here <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* actual guides  */}
      {userGuide?.map((e, index: number) => {
        const iconPerson = L.divIcon({
          html: `
    <img 
      src="${e.profileURL}"
      style="
        width:40px;
        height:48px;
        object-fit:cover;
        border-radius:9999px 9999px 8px 8px;
        clip-path: polygon(50% 0%,90% 20%,90% 70%,50% 100%,10% 70%,10% 20%);
      "
    />
  `,
          iconUrl: e.profileURL,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
          className: " rounded-full   ",
        });

        return (
          <Marker
            eventHandlers={{
              click: () => openGuideSide(e),
            }}
            key={index}
            position={e.position}
            icon={iconPerson}
          >
            {/* <Popup>
              <div
                className="grid place-items-center gap-3 hover:comp-bg cursor-pointer"
                onClick={() => {
                  router.push(`/guide-profile/${e.id}?page=1`);
                }}
              >
                <img
                  src={e.profileURL}
                  alt={e.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-blue-600 ">{e.name}</span>
              </div>
            </Popup> */}
          </Marker>
        );
      })}
    </div>
  );
};

export default MapMarker;
