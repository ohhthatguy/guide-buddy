import connectDB from "@/lib/database/database";
import AccountModel from "@/lib/database/Model/Account";
import { NextResponse, NextRequest } from "next/server";
import { sendMail } from "@/lib/helper/mail";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, password, role } = reqBody;

    if (!email) {
      return NextResponse.json({ err: "Email is missing at signup" });
    }

    if (!password) {
      return NextResponse.json({ err: "Password is missing at signup" });
    }

    //checks if a user of same email is already there
    const user = await AccountModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { err: "User with the same email exists !" },
        { status: 500 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const verifyToken = await bcryptjs.hash(
      process.env.VERIFICATION_SECRET!,
      salt
    );
    const verifyTokenExpiry = Date.now() + 3600000;

    //save in db
    const newAccount = new AccountModel({
      name,
      email,
      password: hashedPassword,
      role,
      verifyToken,
      verifyTokenExpiry,
    });

    const savedAccount = await newAccount.save();
    console.log("saved user: ", savedAccount);

    //send Verification
    await sendMail(email, "VERIFY", verifyToken);

    return NextResponse.json({
      msg: "user saved in db. waiting for verification to complete",
      data: savedAccount,
    });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
