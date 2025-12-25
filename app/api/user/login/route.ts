import connectDB from "@/lib/database/database";
import AccountModel from "@/lib/database/Model/Account";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
await connectDB();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const newAccount = await AccountModel.findOne({ email });
    if (!newAccount) {
      return NextResponse.json(
        { err: "Email is not found in database!" },
        { status: 500 }
      );
    }
    console.log(newAccount);

    const isMatch = await bcryptjs.compare(password, newAccount.password);
    console.log(isMatch);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!newAccount.isVerified) {
      return NextResponse.json(
        { err: "This account is not verified Yet!" },
        { status: 500 }
      );
    }

    // 3. If it matches, continue with login (e.g., create a JWT)
    const tokenData = {
      id: newAccount._id,
      email: newAccount.email,
      //   isFirstTime: newAccount.isFirstTime,
      role: newAccount.role,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful!",
        isFirstTime: newAccount.isFirstTime,
        role: newAccount.role,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (err) {
    console.log("Error while Logging in: ", err);
    return NextResponse.json(
      { err: "Error while loggin in backend" },
      { status: 500 }
    );
  }
}
