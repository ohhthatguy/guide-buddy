"use client";

import SearchBox from "../component/SearchBox";
import Map from "@/component/Map/MapWrapper";
import GuideCard from "../component/GuideCard";
import { useState, useEffect } from "react";
import { PopulatedGuideNameFromDB } from "@/app/(guide)/guide-profile/type/type";

const page = () => {
  type viewtype = "list" | "map";

  const [selectedView, setSelectedView] = useState<viewtype>("list");
  const [activeGuides, setActiveGuides] = useState<
    PopulatedGuideNameFromDB[] | []
  >([]);

  useEffect(() => {
    const getAllGuide = async () => {
      try {
        const res = await fetch("/api/user/activity/searchAllGuides");
        const data = await res.json();
        setActiveGuides(data.data);
        console.log(data);
      } catch (error) {
        console.log("Error at the get all guide useEffect");
      }
    };

    getAllGuide();
  }, []);

  console.log(activeGuides);

  return (
    <div className="mx-8">
      <SearchBox
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {selectedView == "list" ? (
        <GuideCard activeGuides={activeGuides} />
      ) : (
        <Map activeGuides={activeGuides} />
      )}
    </div>
  );
};

export default page;
