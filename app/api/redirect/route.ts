import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: NextResponse) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    //first verify the token
    const verifiedToken = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as { id: string; role: "guide" | "customer" };

    if (!verifiedToken)
      return NextResponse.json(
        { msg: "Token is not verified for routing" },
        { status: 500 }
      );

    const data =
      verifiedToken.role === "guide"
        ? `/dashboard?id=${verifiedToken.id}&page=1`
        : `/home?id=${verifiedToken.id}&view=map`;

    return NextResponse.json(
      { msg: "succesfully retrived routing Data", data },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Error in reading cookkies to set the route while clicking the logo (backend): ",
      error
    );
    return NextResponse.json(
      {
        msg: "Error in reading cookkies to set the route while clicking the logo (backend): ",
        data: error,
      },
      { status: 500 }
    );
  }
}
