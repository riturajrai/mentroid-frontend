import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/login")) return NextResponse.next();

  const token = req.cookies.get("token");
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  };
  try {
    jwt.verify(token, process.env.JWT_SECRET); // verify token directly
    return NextResponse.next();
  } catch (err) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}
