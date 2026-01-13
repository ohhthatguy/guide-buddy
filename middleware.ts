import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPath = ["/", "/login", "/signup", "/verify"];

  const isPublicPath = publicPath.find((e) => e == path);

  const token = req.cookies.get("token")?.value || "";

  if (!isPublicPath && !token) {
    //user is in private path and token is expired
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicPath && token) {
    //user is in public path and just got the token
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (decodedToken.role == "guide") {
      return NextResponse.redirect(
        new URL(`/dashboard?id=${decodedToken.id}&page=1`, req.url)
      ); //guide id requires
    }

    if (decodedToken.role == "customer") {
      return NextResponse.redirect(new URL(`/home`, req.url));
    }
  }
}

export const config = {
  matcher: ["/home", "/dashboard", "/guide-profile"],
};
