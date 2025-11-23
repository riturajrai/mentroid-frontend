"use client";

/*
-------------------------------------------------------------
🛡️ ProtectedRoute Component (Documentation)
-------------------------------------------------------------
PURPOSE:
ProtectedRoute ensures that only authenticated users can
access certain pages. If a user is not logged in, they are
automatically redirected to the "/login" page.

 HOW IT WORKS:
1. It uses the `useAuth()` hook to check:
   - `user`     → currently logged-in user's data
   - `loading`  → authentication status is still being verified

2. If `loading` is true → show a loading screen.

3. If loading is finished but user is NOT logged in:
   → redirect to "/login".

4. If user IS logged in:
   → show the protected page (children).

USE CASES:
✔ Dashboard pages
✔ Profile page
✔ Settings page
✔ Any private internal route
✔ Pages requiring authentication

 Do NOT use on public pages like:
✘ Login
✘ Register
✘ Forgot password
✘ Homepage (if public)

-------------------------------------------------------------
*/

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  /*
  -------------------------------------------------------------
   Redirect Logic:
  - Wait until loading completes
  - If user = null → redirect to login page
  -------------------------------------------------------------
 */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [loading, user, router]);

  /*
  -------------------------------------------------------------
  ⏳ Loading State:
  - Show a loading screen while authentication is being checked
  -------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  /*
  -------------------------------------------------------------
  Prevent Flashing:
  - If user is not available (during redirect),
    return null to prevent UI flicker.
  -------------------------------------------------------------
  */
  if (!user) return null;

  /*
  -------------------------------------------------------------
   Authenticated User:
  - Render the protected children components
  -------------------------------------------------------------
  */
  return <>{children}</>;
}
