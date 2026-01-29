"use client";
import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import SideGuide from "./sideGuide/SideGuide";
import SpecialCustomerHomeHeader from "@/app/(customer)/component/SpecialCustomerHomeHeader";
import type {
  PopulatedGuideNameFromDB,
  MongoId,
} from "@/app/(guide)/guide-profile/type/type";
import MapMarker from "./MapMarker";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./mapcss.css";
import { useState } from "react";
import { MainMapRecenterMap } from "./setPositionOnMap/MainMapRecenterMap";

export default function leafletMap({
  activeGuides,
}: {
  activeGuides: PopulatedGuideNameFromDB[];
}) {
  type GuideMarker = {
    id: number | MongoId;
    name: string;
    profileURL: string; // image URL
    position: [number, number];
    //distance far from customer
  };

  const [selectedSideGuide, setSelectedSideGuide] = useState<
    PopulatedGuideNameFromDB | undefined
  >(undefined);
  const [openSide, setOpenSide] = useState<boolean>(false);

  const position = useGetCurrentPosition();
  if (!position) {
    return <div>Finding your location...</div>;
  }

  const openGuideSide = (e: GuideMarker) => {
    console.log(e);
    const sideGuide = activeGuides.find((ele) => ele._id === e.id);
    console.log(sideGuide);
    setSelectedSideGuide(sideGuide);
    setOpenSide(true);
    // alert("test done");
  };

  return (
    <div className="">
      <SpecialCustomerHomeHeader />
      <div
        className={`grid transition-all duration-1000 ease-in-out relative 
           ${openSide ? "grid-cols-[0fr_1fr] sm:grid-cols-[2fr_1fr]  " : "grid-cols-[1fr_0fr]"} `}
      >
        <div>
          <MapContainer
            className="map"
            center={position}
            zoom={10}
            zoomControl={false}
            // scrollWheelZoom={true} //true
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MainMapRecenterMap coords={position} />

            <MapMarker
              currentUserPos={position}
              activeGuides={activeGuides}
              openGuideSide={openGuideSide}
            />
          </MapContainer>
        </div>

        <SideGuide
          setOpenSide={setOpenSide}
          selectedSideGuide={selectedSideGuide}
        />
      </div>
    </div>
  );
}
