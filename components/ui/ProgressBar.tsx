// File: components/ui/ProgressBar.tsx
"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // A value between 0 and 100
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <motion.div
        className="bg-indigo-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};