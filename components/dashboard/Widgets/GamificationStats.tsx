// File: components/dashboard/Widgets/GamificationStats.tsx
"use client";

import { FireIcon, TrophyIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// Define the shape of the props we expect from the dashboard page
type GamificationStatsProps = {
  stats?: {
    streak: number;
    level: number;
    goalsCompleted: number;
  };
};

export const GamificationStats = ({ stats }: GamificationStatsProps) => {
  // If no stats are passed, don't render anything
  if (!stats) {
    return null;
  }

  // Transform the incoming stats object into an array for easy mapping
  const statsList = [
    { name: "Current Streak", value: `${stats.streak} Days`, icon: FireIcon, color: "text-orange-500" },
    { name: "Level", value: stats.level, icon: SparklesIcon, color: "text-yellow-500" },
    { name: "Goals Completed", value: stats.goalsCompleted, icon: TrophyIcon, color: "text-indigo-500" },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statsList.map((stat) => (
            <div key={stat.name} className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700 mr-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};