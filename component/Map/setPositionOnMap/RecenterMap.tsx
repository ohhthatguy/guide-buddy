import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const RecenterMap = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    // Check for [0, 0] to avoid snapping to the ocean before data is ready
    if (coords[0] !== 0 && coords[1] !== 0) {
      map.setView(coords, map.getZoom());
      // Use map.flyTo(coords, 14) for a smooth animation
    }
  }, [coords, map]);

  return null;
};
