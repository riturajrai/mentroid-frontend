"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";
import {LogOut,User, Settings, Menu, X, ChevronDown} from "lucide-react";
import toast from "react-hot-toast";
import api from "@/app/lib/api";
import ProtectedRoute from "../ProtectedRoute";
export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await api.post('/user/auth/logout',{});
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">
              Mentoroid<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {user ? (
              // Logged In: Profile Dropdown
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition group"
                >
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700 hidden sm:block">
                    {user.name || user.email}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/50"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span>My Profile</span>
                        </Link>

                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span>Settings</span>
                        </Link>

                        <hr className="my-2 border-gray-200" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Not Logged In: Login / Register Buttons
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}