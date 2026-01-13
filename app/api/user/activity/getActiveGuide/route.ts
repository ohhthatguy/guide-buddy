import connectDB from "@/lib/database/database";
import GuideModel from "@/lib/database/Model/Guide";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const MAX_DISTANCE_IN_KM = 10;
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    // Fetch directly from MongoDB

    if (!lat || !lng) {
      throw new Error("LAT/LONG OF USER NOT FOUND TO BACKEND!");
    }

    const data = await GuideModel.find({
      available: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // Always [Longitude, Latitude]
          },
          $maxDistance: MAX_DISTANCE_IN_KM * 1000, // 10km = 10,000 meters
        },
      },
    })
      .populate("guideId", "name")
      .lean();
    // const data = JSON.parse(JSON.stringify(res));
    console.log("lng: ", lng);
    console.log("lat: ", lat);

    console.log("DATA: ", data);

    return NextResponse.json(
      {
        msg: "Succesfully get allActiveGuideFetch(): ",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching guides at getallguide():", error);
    return NextResponse.json(
      {
        msg: "failed to get allActiveGuideFetch(): ",
        error,
      },
      { status: 500 }
    );
  }
}
