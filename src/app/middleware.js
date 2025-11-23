import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // cookie from backend

  const url = req.nextUrl.pathname;

  const publicRoutes = ["/login"];

  // If logged in but trying to access public route → redirect to dashboard
  if (token && publicRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If NOT logged in and trying to access protected route → redirect to login
  if (!token && !publicRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
