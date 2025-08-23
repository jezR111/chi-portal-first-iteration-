// File: components/dashboard/Widgets/RecentHabitWins.tsx
"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// Define the shape of the props
type Win = {
  id: number;
  text: string;
};

type RecentHabitWinsProps = {
  wins?: Win[];
};

export const RecentHabitWins = ({ wins }: RecentHabitWinsProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Habit Wins
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Check if wins exist and the array is not empty */}
        {wins && wins.length > 0 ? (
          <ul className="space-y-3">
            {wins.map((win) => (
              <li key={win.id} className="flex items-center space-x-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">{win.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          // Display a message when there are no wins
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No recent wins to show. Keep up the good work!
          </p>
        )}
      </CardContent>
    </Card>
  );
};