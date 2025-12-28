import { NextResponse } from "next/server";
import connectDB from "@/lib/database/database";
import GuideModel from "@/lib/database/Model/Guide";

await connectDB();
export async function GET() {
  try {
    const data = await GuideModel.find({ available: true }).populate(
      "guideId",
      "name"
    );

    return NextResponse.json(
      { msg: "ALl active guides gotten successfully!", data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting all guides by user (backend): ", error);
    return NextResponse.json(
      { msg: "Error in backend in getting all active guides", error },
      { status: 500 }
    );
  }
}
