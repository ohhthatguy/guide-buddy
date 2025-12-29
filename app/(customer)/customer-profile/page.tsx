import connectDB from "@/lib/database/database";
import TourModel from "@/lib/database/Model/Tour";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";
import { notFound } from "next/navigation";
import Profile from "./profile";
import Tours from "./tours";

export default async function TourPage() {
  try {
    await connectDB();

    const tokenData = await getTokenData("token");

    if (!tokenData) {
      console.log("getTokenData() has bugs, check it in helper function");
      return notFound();
    }

    const { id, name, role } = tokenData;

    // Explicitly select only what you need for safety
    const tour = await TourModel.findOne({ "client.id": id }).lean();

    if (!tour) {
      notFound(); // This triggers your not-found.tsx file
    }

    const serializedTour = JSON.parse(JSON.stringify(tour));
    console.log(serializedTour);
    return (
      <main className="p-8">
        <Profile tour={serializedTour} />
        <Tours tour={serializedTour} />
      </main>
    );
  } catch (error) {
    // This will be caught by error.tsx
    throw new Error("Failed to fetch tour data from database");
  }
}
