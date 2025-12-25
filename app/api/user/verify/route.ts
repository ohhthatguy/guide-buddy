import connectDB from "@/lib/database/database";
import AccountModel from "@/lib/database/Model/Account";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { token } = await req.json();

  // Find user with matching token AND ensure token hasn't expired
  //   const user = await AccountModel.findOne({
  //     verifyToken: token,
  //     verifyTokenExpiry: { $gt: Date.now() }, // $gt means "Greater Than"
  //   });
  //   console.log("user found at verify route: ", user);

  // 1. Find user by token ONLY
  const user = await AccountModel.findOne({ verifyToken: token });

  if (!user) {
    return NextResponse.json({ message: "INVALID_TOKEN" }, { status: 400 });
  }

  // 2. Now check if it's expired
  const currentTime = Date.now();
  const expiryTime = user.verifyTokenExpiry?.getTime()!; // Ensure it's a number

  if (expiryTime < currentTime) {
    return NextResponse.json(
      {
        message: "TOKEN_EXPIRED",
      },
      { status: 400 }
    );
  }

  // 3. If it reaches here, the token is valid AND not expired
  user.isVerified = true;

  if (!user) {
    const userAlreadyVerified = await AccountModel.findOne({
      isVerified: true,
    });

    if (userAlreadyVerified) {
      // if verifiytoken and expiry are not there, check if it is already verified
      return NextResponse.json({ message: "VERIFIED" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "NOT_VERIFIED" }, { status: 500 });
    }
  }

  // Update user
  user.isVerified = true;
  user.verifyToken = undefined; // Clear the token so it can't be used again
  user.verifyTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: "VERIFIED" }, { status: 200 });
}
