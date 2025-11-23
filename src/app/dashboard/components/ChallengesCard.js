"use client";

export default function ChallengesCard() {
  const challenges = [
    { title: "Math Quiz", subject: "Algebra & Geometry", due: "2 days", emoji: "📐", color: "border-blue-500 bg-blue-50" },
    { title: "Science Lab", subject: "Physics Experiment", due: "5 days", emoji: "🔬", color: "border-green-500 bg-green-50" },
    { title: "English Essay", subject: "Creative Writing", due: "1 week", emoji: "✍️", color: "border-purple-500 bg-purple-50" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Challenges</h3>

      <div className="space-y-4">
        {challenges.map((c, i) => (
          <div key={i} className={`p-4 border-l-4 ${c.color} rounded-r-lg`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-gray-800">{c.title}</div>
                <div className="text-sm text-gray-600 mt-1">{c.subject}</div>
                <div className="text-xs text-gray-500 mt-2">Due: {c.due}</div>
              </div>
              <div className="text-2xl">{c.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition font-semibold">
        View All Challenges →
      </button>
    </div>
  );
}
