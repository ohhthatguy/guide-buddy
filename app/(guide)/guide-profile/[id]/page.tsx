import type { GuideType, ReviewType } from "../type/type";
import ProfileSection from "./ProfileSection/ProfileSection";
import PaymentSection from "./PaymentSection";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const guideData: GuideType[] = [
    {
      id: "1",
      name: "Maria Garcia",
      rating: 4.9,
      reviews: 127,
      specialty: "Historical Tours",
      hourlyRate: 45,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      available: true,
      distance: "0.5 miles away",
      bio: "Passionate about sharing the rich history and culture of the city.",
      languages: ["English", "Spanish", "French"],
      experience: "10+ years",
      toursCompleted: 850,
      responseTime: "5 minutes",
      certifications: ["Licensed Tour Guide", "First Aid Certified"],
    },
    {
      id: "2",
      name: "Alex Chen",
      rating: 4.8,
      reviews: 98,
      specialty: "Food & Street Tours",
      hourlyRate: 40,
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
      available: true,
      distance: "1.2 miles away",
      bio: "Food lover who enjoys exploring hidden local flavors.",
      languages: ["English", "Mandarin"],
      experience: "7 years",
      toursCompleted: 540,
      responseTime: "10 minutes",
      certifications: ["Culinary Tour Expert"],
    },
    {
      id: "3",
      name: "Emma Wilson",
      rating: 4.7,
      reviews: 76,
      specialty: "Nature & Hiking Tours",
      hourlyRate: 50,
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      available: false,
      distance: "3 miles away",
      bio: "Nature enthusiast offering scenic and peaceful hiking tours.",
      languages: ["English"],
      experience: "6 years",
      toursCompleted: 410,
      responseTime: "15 minutes",
      certifications: ["Mountain Safety Certified"],
    },
    {
      id: "4",
      name: "Ravi Kumar",
      rating: 4.9,
      reviews: 143,
      specialty: "Cultural & Temple Tours",
      hourlyRate: 35,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      available: true,
      distance: "0.8 miles away",
      bio: "Deeply connected to local traditions and heritage sites.",
      languages: ["English", "Hindi", "Nepali"],
      experience: "12 years",
      toursCompleted: 920,
      responseTime: "3 minutes",
      certifications: ["Cultural Heritage Specialist"],
    },
    {
      id: "5",
      name: "Sophie Laurent",
      rating: 4.6,
      reviews: 64,
      specialty: "Art & Museum Tours",
      hourlyRate: 55,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      available: true,
      distance: "2 miles away",
      bio: "Art historian bringing museums and galleries to life.",
      languages: ["English", "French"],
      experience: "8 years",
      toursCompleted: 380,
      responseTime: "20 minutes",
      certifications: ["Art History Degree", "Museum Guide License"],
    },
  ];

  const { id } = await params;

  const selectedData = guideData.find((e) => e.id === id);
  if (!selectedData) {
    alert("No data of particualr id was found!");
    return;
  }
  console.log(selectedData);

  return (
    <div className="grid grid-cols-[2fr_1fr] mx-8 gap-8">
      <ProfileSection data={selectedData} id={id} />
      <PaymentSection rate={selectedData.hourlyRate ?? 10} />
    </div>
  );
};

export default page;
