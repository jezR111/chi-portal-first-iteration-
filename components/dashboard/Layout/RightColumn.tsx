import React from "react";

const areas = [
  { name: "Charisma", value: 70, color: "bg-pink-500" },
  { name: "Cognition", value: 85, color: "bg-blue-500" },
  { name: "Focus", value: 60, color: "bg-green-500" },
  { name: "Wealth", value: 50, color: "bg-yellow-500" },
  { name: "Spirit", value: 90, color: "bg-purple-500" },
];

export function RightColumn() {
  return (
    <aside className="w-full md:w-80 flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm h-fit">
      {/* Avatar */}
      <div className="mb-6">
        <img
          src="/avatar-placeholder.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-primary shadow-lg"
        />
        <div className="mt-2 text-center text-lg font-semibold text-gray-900 dark:text-white">
          You
        </div>
      </div>
      {/* Bar Graph */}
      <div className="w-full">
        <h4 className="text-md font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">
          Self-Development Areas
        </h4>
        <div className="space-y-4">
          {areas.map((area) => (
            <div key={area.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area.name}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${area.color}`}
                  style={{ width: `${area.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
