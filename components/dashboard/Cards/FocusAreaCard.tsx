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
