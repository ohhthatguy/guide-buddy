"use client";

import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "../mapcss.css";

export default function ClientSideMeetupMap({
  meetupCord,
}: {
  meetupCord: [number, number];
}) {
  const position = useGetCurrentPosition();
  if (!position) {
    return <div>Finding your location...</div>;
  }

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={13}
      scrollWheelZoom={false} //true
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <MapMarker currentUserPos={position} activeGuides={activeGuides} /> */}
      <Marker position={position}>
        <Popup>Current User Here</Popup>
      </Marker>

      <Marker position={meetupCord}>
        <Popup>MEETUP POINT HERE</Popup>
      </Marker>
    </MapContainer>
  );
}
