"use client";

import SearchBox from "../component/SearchBox";
import Map from "@/component/Map/MapWrapper";
import GuideCard from "../component/GuideCard";
import { useState } from "react";

const page = () => {
  type viewtype = "list" | "map";

  const [selectedView, setSelectedView] = useState<viewtype>("list");

  return (
    <div className="mx-8">
      <SearchBox
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      {selectedView == "list" ? <GuideCard /> : <Map />}
    </div>
  );
};

export default page;
