// File: components/dashboard/DashboardHeader.tsx
import React from "react";

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome back, {userName}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Here's a snapshot of your journey today.
      </p>
    </div>
  );
};