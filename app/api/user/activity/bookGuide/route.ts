import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/database/database";
import TourModel from "@/lib/database/Model/Tour";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

await connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const verifiedDataFromToken = jwt.verify(
      token || "",
      process.env.JWT_SECRET!
    ) as { id: string; name: string };

    if (!verifiedDataFromToken)
      return NextResponse.json(
        { msg: " TOKEN IS NOT VERIFIED " },
        { status: 500 }
      );

    const finalDataForDb = {
      ...reqBody,
      client: {
        id: verifiedDataFromToken.id,
        name: verifiedDataFromToken.name,
      },
    };
    console.log(finalDataForDb);

    const newTour = new TourModel(finalDataForDb);
    const saveNewTour = await newTour.save();

    return NextResponse.json(
      {
        msg: "Successfully saved data to db about tour booking",
        finalDataForDb,
        saveNewTour,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in booking guide (Backend): ", error);
    return NextResponse.json(
      { msg: "Error in booking guide (Backend): ", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const verifiedDataFromToken = jwt.verify(
      token || "",
      process.env.JWT_SECRET!
    ) as { id: string; name: string };

    if (!verifiedDataFromToken)
      return NextResponse.json(
        { msg: " TOKEN IS NOT VERIFIED " },
        { status: 500 }
      );

    const finalDataForDb = {
      ...reqBody.finalData,
      client: {
        id: verifiedDataFromToken.id,
        name: verifiedDataFromToken.name,
      },
    };

    console.log("GUIDE BOOKING PUT: ");
    console.log(reqBody);
    console.log(finalDataForDb);

    const result = await TourModel.findOneAndUpdate(
      { _id: reqBody.tourId }, // The "Filter" (What to look for)
      { $set: finalDataForDb } // The "Update" (What to change)
    );

    return NextResponse.json(
      {
        msg: "Successfully updated data to db about tour booking",
        finalDataForDb,
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in updating booking guide (Backend): ", error);
    return NextResponse.json(
      { msg: "Error in updating booking guide (Backend): ", error },
      { status: 500 }
    );
  }
}
