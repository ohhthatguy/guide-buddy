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
const deg2rad = (deg: number) => deg * (Math.PI / 180);
export const distanceFromThisToMe = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // Round to 1 decimal point (e.g. 1.2 km)
};
