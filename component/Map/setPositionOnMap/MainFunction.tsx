"use client";
import { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MainFunction = ({
  initPosData,
  setInitMeetupLocationData,
  handleMapClick,
}: {
  initPosData: [number, number] | null;
  setInitMeetupLocationData: any;
  handleMapClick: any;
}) => {
  // const [pos, setPos] = useState<[number, number] | null>(initPosData);

  const map = useMapEvents({
    click(e) {
      map.locate();
      console.log("Clicked Cordinate: ", e.latlng);

      // setPos((prev) => [e.latlng.lat, e.latlng.lng]);
      setInitMeetupLocationData({
        type: "Point",
        coordinates: [e.latlng.lat, e.latlng.lng],
      });
      //saved in db as longitude, laltitude for mongo
      handleMapClick(e.latlng.lng, e.latlng.lat);
    },
  });

  console.log("meetup_position in paymentSection: ", initPosData);

  return (
    <>
      {initPosData !== null && (
        <Marker position={initPosData as [number, number]}>
          <Popup>Meeting Point here</Popup>
        </Marker>
      )}
    </>
  );
};

export default MainFunction;
