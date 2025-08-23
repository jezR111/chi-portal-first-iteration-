// File: components/dashboard/GlowStatCard.tsx
import React from "react";

interface GlowStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  accentColor: 'green' | 'blue' | 'yellow';
}

export const GlowStatCard = ({ icon, title, value, accentColor }: GlowStatCardProps) => {
    const colorVariants: { [key: string]: string } = {
        green: "shadow-[0px_0px_20px_rgba(74,222,128,0.3)] text-green-400",
        blue: "shadow-[0px_0px_20px_rgba(96,165,250,0.3)] text-blue-400",
        yellow: "shadow-[0px_0px_20px_rgba(250,204,21,0.3)] text-yellow-400",
    };
  return (
    <div className={`bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg backdrop-blur-sm ${colorVariants[accentColor]}`}>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-700/50">
          {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};