import { Dispatch, SetStateAction } from "react";
import type { TourDataType } from "@/app/(guide)/guide-profile/type/type";

import MainFunction from "./MainFunction";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";

export default function SetPositionOnMap({
  paymentSectionData,
  setPaymentSectionData,
}: {
  paymentSectionData: TourDataType;
  setPaymentSectionData: Dispatch<SetStateAction<TourDataType>>;
}) {
  const initMeetingCoord = paymentSectionData.meetup_location.coordinates;
  console.log(initMeetingCoord);

  const initPosData =
    initMeetingCoord[0] === 0 && initMeetingCoord[1] === 0
      ? null
      : ([initMeetingCoord[1], initMeetingCoord[0]] as [number, number]);

  const currentPos = useGetCurrentPosition();
  const centerOfMeetupMap = initPosData ? initPosData : currentPos;

  return (
    <div>
      <MapContainer
        center={centerOfMeetupMap ?? [0, 0]}
        zoom={10}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MainFunction
          paymentSectionData={paymentSectionData}
          setPaymentSectionData={setPaymentSectionData}
          initPosData={initPosData}
        />
      </MapContainer>
    </div>
  );
}
