import { NextResponse } from "next/server";
import connectDB from "@/lib/database/database";

await connectDB();

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "Logout Successfully!",
      status: 200,
    });

    response.cookies.delete("token");
    return response;
  } catch (err) {
    console.log("Error in login out: ", err);
    return NextResponse.json({
      message: "Logout Failed!",
      status: 500,
      err,
    });
  }
}
