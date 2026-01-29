"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./Map"), {
  loading: () => (
    <div className="h-screen flex  justify-center items-center">
      Map is being LOADED
    </div>
  ),
  ssr: false,
});

export default function MapWrapper(props: any) {
  return <LeafletMap {...props} />;
}
