import type { GuideType, ReviewType } from "../../type/type";
import Profile from "./Profile";
import About from "./About";
import Certification from "./Certification";
import Reviews from "./Reviews";
const ProfileSection = ({
  data,
  id,
  role,
  page,
  location,
}: {
  data: GuideType;
  id: string;
  role: "guide" | "customer";
  page: string;
  location: [number, number];
}) => {
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
    "profileURL",
    "distance",
    "id",
    "name",
    "rating",
    "speciality",
  ]);

  const certificationData = omit(data, [
    "hourlyRate",
    "reviews",
    "toursCompleted",
    "available",
    "profileURL",
    "distance",
    "id",
    "name",
    "rating",
    "speciality",
    "languages",
    "responseTime",
    "available",
  ]);

  // console.log(data);
  // console.log(profileData);
  // console.log(aboutData);
  // console.log(certificationData);

  return (
    <div className={`${role === "guide" && " w-10/11"}`}>
      <Profile profileData={profileData} location={location} />
      <div
        className={`${role === "guide" && "grid grid-cols-[1fr_1fr] gap-4"}`}
      >
        <About aboutData={aboutData} />
        <Certification certificationData={certificationData} />
      </div>
      <Reviews
        id={id}
        role={role as "guide" | "customer"}
        Guidedata={data}
        page={page}
      />
    </div>
  );
};

export default ProfileSection;
