// File: components/dashboard/WidgetContainer.tsx
import React from "react";

interface WidgetContainerProps {
  title: string;
  children: React.ReactNode;
}

export const WidgetContainer = ({ title, children }: WidgetContainerProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div>{children}</div>
    </div>
  );
};