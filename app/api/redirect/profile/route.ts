import { NextResponse } from "next/server";
import { getTokenData } from "@/lib/helper/useGetDataFromToken";

export async function GET() {
  try {
    const verifiedToken = await getTokenData("token");

    if (!verifiedToken)
      return NextResponse.json(
        { msg: "Token is not verified for routing" },
        { status: 500 }
      );

    const data = verifiedToken.role === "guide" ? `/` : `/customer-profile`;

    return NextResponse.json(
      { msg: "succesfully retrived routing profile Data", data },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Error in reading cookkies to set the route while clicking the logo (backend): ",
      error
    );
    return NextResponse.json(
      {
        msg: "Error in reading cookkies to set the profile route while clicking the logo (backend): ",
        data: error,
      },
      { status: 500 }
    );
  }
}
