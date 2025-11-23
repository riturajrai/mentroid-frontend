"use client";

import ProtectedRoute from "../components/ProtectedRoute"; 
import ProfileCard from "./components/ProfileCard";
import ProgressCard from "./components/ProgressCard";
import LeaderboardCard from "./components/LeaderboardCard";
import ChallengesCard from "./components/ChallengesCard";
import WeeklyProgress from "./components/WeeklyProgress";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="space-y-6">
          <ProfileCard />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProgressCard />
            <LeaderboardCard />
            <ChallengesCard />
          </div>

          <WeeklyProgress />
        </div>
      </div>
    </ProtectedRoute>
  );
}
