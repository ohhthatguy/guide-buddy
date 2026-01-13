"use client";

import Button from "@/component/Button/page";
import { Star, MapPin, ClipboardList } from "lucide-react";
import type {
  PopulatedGuideNameFromDB,
  MongoId,
} from "@/app/(guide)/guide-profile/type/type";
import { useRouter } from "next/navigation";

const GuideCard = ({
  activeGuides,
}: {
  activeGuides: PopulatedGuideNameFromDB[];
}) => {
  type guideCardType = {
    name: string;
    profileURL: string;
    rating: number;
    distance: number;
    rate: number;
    review: number;
    talksAbout: string;
    available: boolean;
    id: string | MongoId;
  };

  const dummyguide: guideCardType[] = [
    {
      name: "Aarav Sharma",
      profileURL:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      distance: 2.3,
      rate: 25,
      review: 128,
      talksAbout: "Local culture",
      available: true,
      id: "1",
    },
    {
      name: "Ritika Mehta",
      profileURL:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      distance: 5.1,
      rate: 20,
      review: 89,
      talksAbout: "History",
      available: false,
      id: "2",
    },
    {
      name: "Sanjay Karki",
      profileURL:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      distance: 1.2,
      rate: 30,
      review: 214,
      talksAbout: "Mountain",
      available: true,
      id: "3",
    },
    {
      name: "Priya Singh",
      profileURL:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.3,
      distance: 7.8,
      rate: 18,
      review: 56,
      talksAbout: "Street food",
      available: true,
      id: "4",
    },
    {
      name: "Nabin Thapa",
      profileURL:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      distance: 3.6,
      rate: 22,
      review: 102,
      talksAbout: "Nightlife",
      available: false,
      id: "5",
    },
  ];

  console.log(activeGuides);

  const guidesForCards: guideCardType[] = activeGuides?.map(
    (guide: PopulatedGuideNameFromDB) => ({
      id: guide._id,
      name: guide.guideId.name,
      profileURL:
        guide.profileURL ||
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: guide.rating,
      rate: guide.hourlyRate,
      available: guide.available,
      // Join the speciality array into a single string for 'talksAbout'
      talksAbout: guide.speciality.join(", "),
      // Placeholder values for data not in your snippet
      distance: 0, // This usually requires a calculation function
      review: 0, // You might need a count() query for this later
    })
  );

  console.log(guidesForCards);

  const realGuides: guideCardType[] = [...dummyguide, ...guidesForCards];

  const router = useRouter();
  return (
    <div className="grid grid-cols-3 gap-8">
      {realGuides?.map((e, index) => (
        <div
          className="h-fit rounded-2xl p-4 comp-bg hover:cursor-pointer hover:scale-105 scale-100 duration-300 transition-all "
          key={index}
        >
          <div className="h-52 relative">
            <img
              src={e.profileURL}
              className="w-full h-full object-cover object-center"
            />
            <span className="absolute text-white top-2 right-2 rounded-2xl bg-green-700 px-2">
              {e.available ? "Available" : ""}
            </span>
          </div>

          <div className="my-4 ele-bg rounded-2xl p-2">
            <p className="flex items-center  gap-1">
              <MapPin size={18} /> {e.distance}{" "}
              <span className="muted">km far</span>
            </p>

            <div className="flex justify-between ">
              <p className="text-3xl">{e.name}</p>
              <p className="flex justify-center items-center gap-1">
                <Star size={16} /> {e.rating} ({e.review} reviews)
              </p>
            </div>

            <p className="flex items-center gap-2 font-bold">
              <ClipboardList size={14} /> {e.talksAbout}
            </p>
          </div>

          <hr className="mt-1 mb-2" />

          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2 ele-bg rounded-2xl p-2">
              <p className="text-2xl">${e.rate}</p>
              <span className="muted"> /hr</span>
            </div>
            <Button
              onClick={() => router.push(`/guide-profile/${e.id}?page=1`)}
            >
              View Profile
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuideCard;
