import type { GuideType } from "../type/type";
import GuideModel from "@/lib/database/Model/Guide";
import connectDB from "@/lib/database/database";
import { notFound } from "next/navigation";
import ProfileSection from "./ProfileSection/ProfileSection";
import PaymentSection from "./PaymentSection";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // const guideData: GuideType[] = [
  //   {
  //     id: "1",
  //     name: "Maria Garcia",
  //     rating: 4.9,
  //     reviews: 127,
  //     specialty: "Historical Tours",
  //     hourlyRate: 45,
  //     avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  //     available: true,
  //     distance: "0.5 miles away",
  //     bio: "Passionate about sharing the rich history and culture of the city.",
  //     languages: ["English", "Spanish", "French"],
  //     experience: "10+ years",
  //     toursCompleted: 850,
  //     responseTime: "5 minutes",
  //     certifications: ["Licensed Tour Guide", "First Aid Certified"],
  //   },
  //   {
  //     id: "2",
  //     name: "Alex Chen",
  //     rating: 4.8,
  //     reviews: 98,
  //     specialty: "Food & Street Tours",
  //     hourlyRate: 40,
  //     avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
  //     available: true,
  //     distance: "1.2 miles away",
  //     bio: "Food lover who enjoys exploring hidden local flavors.",
  //     languages: ["English", "Mandarin"],
  //     experience: "7 years",
  //     toursCompleted: 540,
  //     responseTime: "10 minutes",
  //     certifications: ["Culinary Tour Expert"],
  //   },
  //   {
  //     id: "3",
  //     name: "Emma Wilson",
  //     rating: 4.7,
  //     reviews: 76,
  //     specialty: "Nature & Hiking Tours",
  //     hourlyRate: 50,
  //     avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  //     available: false,
  //     distance: "3 miles away",
  //     bio: "Nature enthusiast offering scenic and peaceful hiking tours.",
  //     languages: ["English"],
  //     experience: "6 years",
  //     toursCompleted: 410,
  //     responseTime: "15 minutes",
  //     certifications: ["Mountain Safety Certified"],
  //   },
  //   {
  //     id: "4",
  //     name: "Ravi Kumar",
  //     rating: 4.9,
  //     reviews: 143,
  //     specialty: "Cultural & Temple Tours",
  //     hourlyRate: 35,
  //     avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  //     available: true,
  //     distance: "0.8 miles away",
  //     bio: "Deeply connected to local traditions and heritage sites.",
  //     languages: ["English", "Hindi", "Nepali"],
  //     experience: "12 years",
  //     toursCompleted: 920,
  //     responseTime: "3 minutes",
  //     certifications: ["Cultural Heritage Specialist"],
  //   },
  //   {
  //     id: "5",
  //     name: "Sophie Laurent",
  //     rating: 4.6,
  //     reviews: 64,
  //     specialty: "Art & Museum Tours",
  //     hourlyRate: 55,
  //     avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  //     available: true,
  //     distance: "2 miles away",
  //     bio: "Art historian bringing museums and galleries to life.",
  //     languages: ["English", "French"],
  //     experience: "8 years",
  //     toursCompleted: 380,
  //     responseTime: "20 minutes",
  //     certifications: ["Art History Degree", "Museum Guide License"],
  //   },
  // ];

  await connectDB();
  const { id } = await params;
  const { page } = await searchParams;
  const tokenData = await getTokenData("token");
  if (!tokenData) {
    console.log("Token data not ofund");
    return notFound();
  }
  const { role } = tokenData;

  console.log(id);
  console.log(role);
  console.log("PAGE: ", page);

  let rawGuide;

  if (role == "guide") {
    rawGuide = await GuideModel.findOne({ guideId: id })
      .populate("guideId", "name")
      .lean();
  } else {
    rawGuide = await GuideModel.findById(id).populate("guideId", "name").lean();
  }

  console.log(rawGuide);

  if (!rawGuide) {
    return notFound();
  }

  const selectedData: GuideType = {
    id: rawGuide._id.toString(),
    name: rawGuide.guideId?.name || "Unknown Guide",
    rating: rawGuide.rating || 0,
    reviews: rawGuide.reviews || 0, // Ensure this exists in your DB or default to 0
    speciality: rawGuide.speciality?.[0] || "General Guide", // Extracts first item from array
    hourlyRate: rawGuide.hourlyRate,
    profileURL:
      rawGuide.profileURL ||
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU0MzUwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    available: rawGuide.available,
    distance: "Calculating...", // This is usually dynamic based on user location
    bio: rawGuide.bio || "",
    languages: rawGuide.languages || [],
    experience: rawGuide.experience || "Not specified",
    toursCompleted: rawGuide.toursCompleted || 0,
    responseTime: rawGuide.responseTime || "N/A",
    certifications: rawGuide.certifications || [],
    phone: rawGuide.phone || 0,
  };

  console.log(selectedData);

  return (
    <div
      className={`grid my-4 ${
        role === "guide" ? "place-items-center" : "grid-cols-[2fr_1fr] mx-8"
      }  gap-8`}
    >
      <ProfileSection
        data={selectedData}
        id={id}
        role={role as "guide" | "customer"}
        page={page}
        location={rawGuide.location.coordinates}
      />
      {role !== "guide" && (
        <PaymentSection
          guideName={selectedData.name}
          guideId={id}
          rate={selectedData.hourlyRate ?? 10}
        />
      )}
    </div>
  );
};

export default page;
