// File: components/dashboard/HabitTrackerWidget.tsx
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
              // This is the updated, more robust fix using an inline SVG
              <svg 
                className="w-6 h-6 text-gray-300 dark:text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);
