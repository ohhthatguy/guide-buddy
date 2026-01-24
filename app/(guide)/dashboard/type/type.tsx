import { LucideIcon } from "lucide-react";

export type Guide = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  totalTours: number;
  memberSince: string; // could be number if you prefer year
  specialties: string[];
  languages: string[];
  isOnline: boolean;
};

export type StatCard = {
  title: string;
  value: string;

  icon: LucideIcon;
  color: string; // Tailwind class
  bgColor: string; // Tailwind class
};

type TourStatus = "confirmed" | "pending" | "cancelled";

export type UpcomingTour = {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  price: string;
  status: TourStatus;
};

type ActivityType = "review" | "booking" | "payment" | "milestone";

export type RecentActivity = {
  id: string;
  type: ActivityType;
  message: string;
  time: string;
};
