export type GuideType = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  specialty: string;
  hourlyRate: number;
  avatar: string;
  available: boolean;
  distance: string;
  bio: string; //
  languages: string[]; //
  experience: string; //
  toursCompleted: number;
  responseTime: string;
  certifications: string[];
};

export type ReviewType = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};
