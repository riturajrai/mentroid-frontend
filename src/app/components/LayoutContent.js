"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import Navbar from "../components/Navbar/page";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import PopUp from "./PopUp/page";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const publicRoutes = ["/login", "/register", "/verify-otp"];
  const hideNavbarRoutes = publicRoutes.filter(r => r !== "/verify-otp"); // optional: show navbar on verify-otp if needed

  const hideNavbar = hideNavbarRoutes.includes(pathname) || pathname.startsWith("/verify-otp/");

  // Redirect + Profile Popup Logic
  useEffect(() => {
    if (loading) return;

    // 1. Agar user logged in hai aur public page pe hai → dashboard bhejo
    if (user && (publicRoutes.includes(pathname) || pathname === "/")) {
      router.replace("/dashboard");
      return;
    }

    // 2. Agar user logged in hai aur profile incomplete → popup dikhao
    if (user && !user.profileCompleted) {
      setShowProfilePopup(true);
    } else {
      setShowProfilePopup(false); // Ensure it's hidden if already completed
    }
  }, [user, loading, pathname, router]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  // Not Logged In → Public Pages
  if (!user) {
    return (
      <>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        {!hideNavbar && <Navbar />}
        <main className="min-h-screen bg-gray-50 pt-16">{children}</main>
      </>
    );
  }

  // Logged In → Dashboard Layout + Popup (only if needed)
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      {/* Navbar */}
      <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex min-h-screen">
        {/* Sidebar - Mobile & Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-40  bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="min-h-screen bg-gray-50 pt-16 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Profile Completion Popup - Only shows when needed */}
      {showProfilePopup && (
        <PopUp
          onClose={() => {
            setShowProfilePopup(false);
            // Optional: refresh user data if needed
            // window.location.reload();
          }}
        />
      )}
    </>
  );
}