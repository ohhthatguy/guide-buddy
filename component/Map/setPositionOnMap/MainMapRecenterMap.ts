"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MainMapRecenterMap = ({
  coords,
}: {
  coords: [number, number];
}) => {
  const map = useMap();

  useEffect(() => {
    // Check for [0, 0] to avoid snapping to the ocean before data is ready
    if (coords[0] !== 0 && coords[1] !== 0) {
      // map.setView(coords, map.getZoom());

      // if (zoomAnimationComplete === "false") {
      map.flyTo(coords, 18, {
        duration: 1, // seconds
      });

      // Use map.flyTo(coords, 14) for a smooth animation
    }
  }, []);

  return null;
};
