"use client";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useRouter } from "next/navigation";

const MapMarker = ({
  currentUserPos,
}: {
  currentUserPos: [number, number];
}) => {
  const [lat, lon] = currentUserPos;
  const router = useRouter();

  type GuideMarker = {
    id: number;
    name: string;
    profile: string; // image URL
    position: [number, number];
    //distance far from customer
  };

  const demoUserGuide: GuideMarker[] = [
    {
      id: 1,
      name: "First Name",
      profile: "https://randomuser.me/api/portraits/men/32.jpg",
      position: [lat + 0.1, lon + 0.1],
    },
    {
      id: 2,
      name: "Second Name",
      profile: "https://randomuser.me/api/portraits/women/45.jpg",
      position: [lat + 0.1, lon - 0.1],
    },
    {
      id: 3,
      name: "Third Name",
      profile: "https://randomuser.me/api/portraits/men/76.jpg",
      position: [lat - 0.1, lon - 0.1],
    },
  ];

  return (
    <div>
      {" "}
      {/* current User (customer) */}
      <Marker position={currentUserPos}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* actual guides  */}
      {demoUserGuide?.map((e, index: number) => {
        const iconPerson = L.divIcon({
          html: `
    <img 
      src="${e.profile}"
      style="
        width:40px;
        height:48px;
        object-fit:cover;
        border-radius:9999px 9999px 8px 8px;
        clip-path: polygon(50% 0%,90% 20%,90% 70%,50% 100%,10% 70%,10% 20%);
      "
    />
  `,
          iconUrl: e.profile,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
          className: " rounded-full   ",
        });

        return (
          <Marker key={index} position={e.position} icon={iconPerson}>
            <Popup>
              <div
                className="grid place-items-center gap-3 hover:comp-bg cursor-pointer"
                onClick={() => {
                  router.push(`/guide-profile/${e.id}`);
                }}
              >
                <img
                  src={e.profile}
                  alt={e.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-blue-600 font-medium">
                  {e.name}
                </span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MapMarker;
