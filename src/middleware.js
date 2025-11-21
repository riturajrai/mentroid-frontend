// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Bypass static files and login
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const token = req.cookies.get("token"); // Next.js 16 supports req.cookies.get
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
