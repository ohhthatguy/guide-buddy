import mongoose from "mongoose";
import connectDB from "@/lib/database/database";
import TourModel from "@/lib/database/Model/Tour";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";
import { notFound } from "next/navigation";
import Profile from "./profile";
import Tours from "./tours";
import ClientModel from "@/lib/database/Model/Client";
import { paginationWithoutSkip } from "@/lib/helper/pagination";

export default async function TourPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await mongoose.startSession();
  const params = await searchParams;
  const { page } = params;
  try {
    session.startTransaction();
    await connectDB();

    const tokenData = await getTokenData("token");

    if (!tokenData) {
      console.log("getTokenData() has bugs, check it in helper function");
      return notFound();
    }

    const { id, name, role } = tokenData;

    //get the clientmodelID
    const ress = await ClientModel.findOne({ clientId: id }, null, { session });
    console.log("RESS AT PAHGE: ", ress);
    if (!ress) {
      await session.abortTransaction();
      notFound();
    }

    const TourItemCount = await TourModel.countDocuments({
      "client.id": ress._id,
    });
    console.log("YOUR ITEM COUNT: ", TourItemCount);

    const pagLimit = paginationWithoutSkip(Number(page));

    // Explicitly select only what you need for safety
    const tour = await TourModel.find({ "client.id": ress._id }, null, {
      session,
    })
      .limit(pagLimit)
      .lean();
    console.log(tour);

    if (!tour) {
      await session.abortTransaction();
      notFound(); // This triggers your not-found.tsx file
    }

    const serializedTour = JSON.parse(JSON.stringify(tour));
    console.log(serializedTour);
    return (
      <main className="p-8 grid gap-4">
        <Profile tour={serializedTour[0]} />
        <Tours
          tour={serializedTour}
          page={page}
          TourItemCount={TourItemCount}
        />
      </main>
    );
  } catch (error) {
    // This will be caught by error.tsx
    await session.abortTransaction();

    throw new Error("Failed to fetch tour data from database");
  } finally {
    await session.endSession();
  }
}
