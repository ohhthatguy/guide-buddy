import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// 1. Defined a specific Return Type for better Intellisense
interface TokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const getTokenData = async (
  tokenName: string
): Promise<TokenPayload | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(tokenName)?.value;
    console.log("Token in helper function: ", token);
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return null;
    }

    const decoded = jwt.verify(token, secret) as TokenPayload;
    if (!decoded) {
      console.error("toekn couldnt be veirfied");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
