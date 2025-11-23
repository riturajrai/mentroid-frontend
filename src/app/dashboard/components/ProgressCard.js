"use client";

export default function ProgressCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
        <select className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-600">
          <option>All Subjects</option>
          <option>Maths</option>
          <option>Science</option>
        </select>
      </div>

      {/* Donut Chart */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="96" cy="96" r="70" stroke="#E5E7EB" strokeWidth="20" fill="none" />
          <circle cx="96" cy="96" r="70" stroke="#FBBF24" strokeWidth="20" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440*35)/100} strokeLinecap="round"/>
          <circle cx="96" cy="96" r="70" stroke="#3B82F6" strokeWidth="20" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440*60)/100} strokeLinecap="round"/>
          <circle cx="96" cy="96" r="70" stroke="#8B5CF6" strokeWidth="20" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440*80)/100} strokeLinecap="round"/>
          <circle cx="96" cy="96" r="70" stroke="#EC4899" strokeWidth="20" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440*95)/100} strokeLinecap="round"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-800">1000</div>
          <div className="text-sm text-gray-500">Total XP</div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-gray-600">English 38%</span></div></div>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span className="text-gray-600">Maths 30%</span></div></div>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-gray-600">Science 22%</span></div></div>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-pink-500"></div><span className="text-gray-600">Social 10%</span></div></div>
      </div>

      <div className="mt-6 text-center text-teal-600 font-semibold">75%</div>
    </div>
  );
}
