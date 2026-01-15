import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/database";

import ClientModel from "@/lib/database/Model/Client";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const client_ID = searchParams.get("client_ID");

    console.log("REQBODY: ", client_ID);
    const res = await ClientModel.findById(client_ID).lean();

    if (!res) {
      return NextResponse.json(
        {
          msg: "Error in getting the client detail Data:",
          res,
        },
        { status: 500 }
      );
    }
    console.log("RES RES: ", res);
    // const data = await res.json();
    return NextResponse.json(
      {
        msg: "Success in getting the client detail Data:",
        res,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting the client detail Data: ", error);
    return NextResponse.json(
      {
        msg: "Error in getting the client detail Data:",
        error,
      },
      { status: 500 }
    );
  }
}
