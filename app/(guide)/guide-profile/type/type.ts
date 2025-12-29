export type GuideType = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  speciality: string;
  hourlyRate: number;
  profileURL: string;
  available: boolean;
  distance: string;
  bio: string; //
  languages: string[]; //
  experience: string; //
  toursCompleted: number;
  responseTime: string;
  certifications: string[];
};

export type MongoId = { $oid: string };

export type GuideTypeFromDB = {
  // DB Specific Identifiers
  _id: MongoId;
  guideId: MongoId;

  // Profile Info (Mappings)
  name?: string; // Usually comes from the User collection join
  profileURL: string; // Maps to your previous 'avatar'
  bio: string;
  languages: string[];

  // Professional Data
  speciality: string[]; // Array as per your DB snippet
  rating: number;
  experience: string;
  certifications: string[];
  toursCompleted: number;
  responseTime: string;

  // Financial & Status
  hourlyRate: number;
  available: boolean;

  // Geospatial Data
  location: {
    type: "Point";
    coordinates: [number, number]; // [Longitude, Latitude]
  };

  // UI/Frontend Extras
  distance?: string; // Calculated at runtime
  reviews?: number; // Derived from count of review documents
  __v?: number; // Mongoose version key
};

export type PopulatedGuideNameFromDB = GuideTypeFromDB & {
  guideId: {
    _id: string;
    name: string; // The joined name field
  };
};

export type ReviewType = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

//upcoming tour
export type TourDataType = {
  id: MongoId | string;
  guide: { id: string | MongoId; name: string };
  client: { id: string | MongoId; name: string };
  date: string;
  time: { startTime: string; endTime: string };
  duration: string;
  price: number | 0;
  location: string;
  status: "PENDING" | "REJECTED" | "ACCEPTED";
};
