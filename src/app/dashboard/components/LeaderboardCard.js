"use client";

export default function LeaderboardCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Leaderboard</h3>

      <div className="space-y-4">
        {[
          { rank: 1, name: "John Doe", xp: 1500, emoji: "🥇", bg: "bg-yellow-400", from: "from-yellow-50 to-yellow-100" },
          { rank: 2, name: "Sarah Smith", xp: 1350, emoji: "🥈", bg: "bg-gray-400", from: "from-gray-50 to-gray-100" },
          { rank: 3, name: "Mike Johnson", xp: 1200, emoji: "🥉", bg: "bg-orange-400", from: "from-orange-50 to-orange-100" },
          { rank: 12, name: "You", xp: 1000, emoji: "", bg: "bg-teal-500", from: "bg-gray-50" },
        ].map((user) => (
          <div key={user.rank} className={`flex items-center gap-3 p-3 bg-gradient-to-r ${user.from} rounded-lg`}>
            <div className={`w-10 h-10 rounded-full ${user.bg} flex items-center justify-center font-bold text-white`}>{user.rank}</div>
            <div className="flex-1">
              <div className={`font-semibold ${user.rank === 12 ? 'text-teal-600' : 'text-gray-800'}`}>{user.name}</div>
              <div className="text-sm text-gray-500">{user.xp} XP</div>
            </div>
            <div className="text-2xl">{user.emoji}</div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition font-semibold">
        View Full Leaderboard →
      </button>
    </div>
  );
}
