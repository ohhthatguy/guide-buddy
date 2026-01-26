import { RecenterMap } from "./RecenterMap";

import MainFunction from "./MainFunction";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function SetPositionOnMap({
  initMeetupLocationData,
  setInitMeetupLocationData,
  handleMapClick,
}: {
  initMeetupLocationData: any;
  setInitMeetupLocationData: any;
  handleMapClick: any;
}) {
  console.log(initMeetupLocationData);
  const initMeetingCoord = initMeetupLocationData.coordinates;
  console.log(initMeetingCoord);

  return (
    <div>
      <MapContainer
        center={initMeetingCoord}
        zoom={10}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap coords={initMeetingCoord} />
        <MainFunction
          initPosData={initMeetingCoord}
          setInitMeetupLocationData={setInitMeetupLocationData}
          handleMapClick={handleMapClick}
        />
      </MapContainer>
    </div>
  );
}
