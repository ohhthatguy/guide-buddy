"use client";

import GuideCard from "../component/GuideCard";
import Map from "@/component/Map/MapWrapper";
import { PopulatedGuideNameFromDB } from "@/app/(guide)/guide-profile/type/type";
import { useGetCurrentPosition } from "@/lib/helper/useGetCurrentPosition";
import { useEffect, useState } from "react";

const GuideCardAndMapClientComp = ({
  selectedView,
}: {
  selectedView: "list" | "map";
}) => {
  const pos = useGetCurrentPosition();
  const [activeGuides, setActiveGuides] = useState<
    PopulatedGuideNameFromDB[] | []
  >([]);

  console.log(pos);

  useEffect(() => {
    const getAllActiveGuide = async () => {
      try {
        if (!pos || pos.length !== 2) {
          throw new Error("PROBELM IN FRONTEND TO GET THE POSIITOn");
        }
        const res = await fetch(
          `/api/user/activity/getActiveGuide?lat=${pos[0]}&lng=${pos[1]}`,
        );
        const data = await res.json();
        console.log(data.data);
        setActiveGuides(data.data);
      } catch (error) {
        console.log("ERROR IN GETTTING ALL THE ACTIVE GUIDE: ", error);
      }
    };

    getAllActiveGuide();
    console.log("HERE");
  }, [pos]);

  return (
    <div>
      {activeGuides.length > 0 ? (
        selectedView == "list" ? (
          <GuideCard activeGuides={activeGuides} pos={pos} />
        ) : (
          <Map activeGuides={activeGuides} />
        )
      ) : (
        <div className="h-screen flex  justify-center items-center">
          LOADINGGGGGGG
        </div>
      )}
    </div>
  );
};

export default GuideCardAndMapClientComp;
