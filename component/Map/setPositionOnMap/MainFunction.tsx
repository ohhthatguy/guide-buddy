"use client";
import { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Dispatch, SetStateAction } from "react";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";

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
  paymentSectionData,
  setPaymentSectionData,
  initPosData,
}: {
  paymentSectionData: TourDataType;
  setPaymentSectionData: Dispatch<SetStateAction<TourDataType>>;
  initPosData: [number, number] | null;
}) => {
  const [pos, setPos] = useState<[number, number] | null>(initPosData);

  const map = useMapEvents({
    click(e) {
      map.locate();
      console.log("Clicked Cordinate: ", e.latlng);

      setPos((prev) => [e.latlng.lat, e.latlng.lng]);
      //saved in db as longitude, laltitude for mongo
      setPaymentSectionData((prev) => ({
        ...prev,
        meetup_location: {
          type: "Point",
          coordinates: [e.latlng.lng, e.latlng.lat],
        },
      }));
    },
  });

  console.log("meetup_position in paymentSection: ", pos);
  console.log("data in paymentSection: ", paymentSectionData);

  return (
    <>
      {pos !== null && (
        <Marker position={pos as [number, number]}>
          <Popup>Meeting Point here</Popup>
        </Marker>
      )}
    </>
  );
};

export default MainFunction;
