// File: components/dashboard/StatCard.tsx
import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

export const StatCard = ({ icon, title, value, color }: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex items-center space-x-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 ${color}`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

// File: components/dashboard/FocusAreaCard.tsx
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface FocusAreaCardProps {
  focusArea?: string;
}

export const FocusAreaCard = ({ focusArea = "Your Next Goal" }: FocusAreaCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full flex flex-col">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Focus Area</h3>
    <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">{focusArea}</p>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex-grow">
      Here are some recommended resources to help you achieve this outcome.
    </p>
    <Button className="mt-4 w-full">
      View Recommendations <ArrowRightIcon className="w-4 h-4 ml-2" />
    </Button>
  </div>
);


// File: components/dashboard/HabitTrackerWidget.tsx
import { CheckCircleIcon, CircleIcon } from "@heroicons/react/24/outline";

interface Habit {
  id: string;
  title: string;
  completed: boolean;
}

interface HabitTrackerWidgetProps {
  habits: Habit[];
}

export const HabitTrackerWidget = ({ habits }: HabitTrackerWidgetProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Habits</h3>
    <div className="space-y-4">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <span className="font-medium text-gray-800 dark:text-gray-200">{habit.title}</span>
          <button>
            {habit.completed ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <CircleIcon className="w-6 h-6 text-gray-300 dark:text-gray-500" />
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);
