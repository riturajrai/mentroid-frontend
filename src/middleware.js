// app/middleware.js (Next.js 13+)
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Optional: verify token on edge (fast)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/auth/me`, {
      headers: { cookie: `token=${token}` },
    });
    if (res.ok) {
      return NextResponse.next();
    }
  } catch {}

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],

};
