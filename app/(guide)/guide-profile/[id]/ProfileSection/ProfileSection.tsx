import React from "react";
import type { GuideType, ReviewType } from "../../type/type";
import Profile from "./Profile";
import About from "./About";
import Certification from "./Certification";
import Reviews from "./Reviews";
const ProfileSection = ({ data, id }: { data: GuideType; id: string }) => {
  const omit = <T extends object, K extends (keyof T)[]>(
    data: T,
    keys: K
  ): Omit<T, K[number]> => {
    const result = { ...data };
    keys.forEach((key) => {
      delete result[key];
    });
    return result;
  };

  const profileData = omit(data, [
    "certifications",
    "languages",
    "bio",
    "hourlyRate",
  ]);

  const aboutData = omit(data, [
    "certifications",
    "hourlyRate",
    "reviews",
    "toursCompleted",
    "available",
    "avatar",
    "distance",
    "id",
    "name",
    "rating",
    "specialty",
  ]);

  const certificationData = omit(data, [
    "hourlyRate",
    "reviews",
    "toursCompleted",
    "available",
    "avatar",
    "distance",
    "id",
    "name",
    "rating",
    "specialty",
    "languages",
    "responseTime",
    "available",
  ]);

  // console.log(data);
  // console.log(profileData);
  // console.log(aboutData);
  // console.log(certificationData);

  return (
    <div className="">
      <Profile profileData={profileData} />
      <About aboutData={aboutData} />
      <Certification certificationData={certificationData} />
      <Reviews id={id} />
    </div>
  );
};

export default ProfileSection;
