"use client";

export default function WeeklyProgress() {
  const data = [
    { day: "Mon", hours: 12 },
    { day: "Tue", hours: 8 },
    { day: "Wed", hours: 15 },
    { day: "Thu", hours: 10 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 14 },
    { day: "Sun", hours: 9 },
  ];

  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Progress</h3>
        <div className="flex gap-2 text-sm">
          <button className="px-4 py-1 bg-teal-600 text-white rounded-lg">This Week</button>
          <button className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">This Month</button>
          <button className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">All Time</button>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-4">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-semibold text-teal-600">{item.hours}h</div>
            <div
              className={`w-full rounded-t-lg transition-all hover:opacity-80 ${i === 2 ? 'bg-teal-600' : 'bg-gray-300'}`}
              style={{ height: `${(item.hours / maxHours) * 100}%` }}
            />
            <div className="text-sm text-gray-600 font-medium">{item.day}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <span className="text-2xl font-bold text-teal-600">{data.reduce((a,b)=>a+b.hours,0)} hours</span>
        <span className="text-gray-600 ml-2">of study this week</span>
        <span className="text-green-600 ml-2">↑ 25%</span>
      </div>
    </div>
  );
}
