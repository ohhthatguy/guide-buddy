"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default LeafletMap;
