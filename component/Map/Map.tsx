import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import MapMarker from "./MapMarker";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./mapcss.css";

export default function leafletMap() {
  // const [position, setPosition] = useState<[number, number] | null>(null);

  const position = useGetCurrentPosition();
  if (!position) {
    return <div>Finding your location...</div>;
  }

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     alert("Geolocation not supported");
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       setPosition([pos.coords.latitude, pos.coords.longitude]);
  //     },
  //     () => {
  //       alert("Location permission denied");
  //     }
  //   );
  // }, []);

  // if (!position) {
  //   return <p>Fetching your location...</p>;
  // }

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={10}
      scrollWheelZoom={true} //true
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapMarker currentUserPos={position} />
    </MapContainer>
  );
}
