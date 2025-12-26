"use client";

import { useState, useEffect } from "react";

export const useGetCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude]); //broswer gives [lat,long] but in db save as [long,lat]
      },
      () => {
        alert("Location permission denied");
      }
    );
  }, []);

  return currentPosition;
};
