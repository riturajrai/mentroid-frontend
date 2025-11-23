// src/app/components/DashboardScreen.js

"use client";

import { useAuth } from ".././context/AuthContext";  // ← YE ADD KAR DO

export default function DashboardScreen() {
  const { user } = useAuth();  // ← YEH LINE ADD KAR DO

  // Agar user abhi load nahi hua toh safe rakho
  if (!user) {
    return (
      <div className="text-center text-white py-10">
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Greeting */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="text-center md:text-left">
              <p className="text-xl opacity-90">Welcome back,</p>
              <h2 className="text-4xl font-bold mt-2">{user.name || "Student"}</h2>
              <p className="text-lg opacity-80 mt-2">Class {user.class} • {user.board}</p>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-white/20 rounded-2xl p-6">
                <p className="text-3xl font-bold">1000</p>
                <p className="opacity-80">XP Coins</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-6">
                <p className="text-3xl font-bold">7</p>
                <p className="opacity-80">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your dashboard content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cards */}
        </div>
      </div>
    </div>
  );
}
