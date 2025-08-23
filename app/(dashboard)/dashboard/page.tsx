// File: app/(dashboard)/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import { QuickAccess } from "@/components/dashboard/QuickAccess";
import { TargetedContentFeed } from "@/components/dashboard/Widgets/TargetedContentFeed";
import { ContentLibraryGrid } from "@/components/dashboard/ContentLibraryGrid";
import { RecentHabitWins } from "@/components/dashboard/Widgets/RecentHabitWins";
import { GamificationStats } from "@/components/dashboard/Widgets/GamificationStats";
import { RightColumn } from "@/components/layout/RightColumn";

// This mock data combines all necessary pieces for the new components
const mockData = {
  stats: {
    streak: 5,
    level: 3,
    goalsCompleted: 2,
  },
  recentWins: [
    { id: 1, text: "Completed 'Daily Meditation'" },
    { id: 2, text: "Read for 30 minutes" },
  ],
  profile: {
    currentLevel: 3,
    experiencePoints: 250,
  }
};

const fetchDashboardData = async () => {
  return mockData;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardDataV2'],
    queryFn: fetchDashboardData,
  });

  const userName = session?.user?.name || 'User';

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="pt-0 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Thin Progress Header Bar */}
      <div className="w-full overflow-hidden bg-white/80 dark:bg-gray-800/80 px-4 py-6 rounded-b-xl shadow-sm mb-4">
        <div className="relative w-full h-10 flex items-center">
          {/* Ticker (marquee) for streak, level, goals completed */}
          <div className="absolute left-0 top-0 w-full h-full flex items-center animate-marquee whitespace-nowrap pr-48">
            <span className="flex items-center gap-8 text-base text-gray-700 dark:text-gray-200 font-semibold">
              <span className="flex items-center gap-2 text-orange-500">
                {/* FireIcon for Streak */}
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M16.288 4.95c.532.94.922 2.07.922 3.38 0 1.5-.5 2.5-1.5 3.5C18 12.5 19 14 19 15.5c0 2.5-2 4.5-5 4.5s-5-2-5-4.5c0-1.5 1-3 3.29-3.67C7.5 10.5 7 9.5 7 8c0-1.31.39-2.44.92-3.38.23-.41.81-.41 1.04 0C10.5 6.5 12 8.5 12 8.5s1.5-2 3.04-2.88c.23-.41.81-.41 1.04 0z' /></svg>
                Streak: {data?.stats.streak} days
              </span>
              <span className="flex items-center gap-2 text-yellow-500">
                {/* SparklesIcon for Level */}
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414M17.657 17.657l-1.414-1.414M6.343 6.343L4.929 4.929' /></svg>
                Level: {data?.profile.currentLevel}
              </span>
              <span className="flex items-center gap-2 text-indigo-500">
                {/* TrophyIcon for Goals Completed */}
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M16 3v1a4 4 0 01-8 0V3m8 0a4 4 0 01-8 0m8 0h2a2 2 0 012 2v2a6 6 0 01-6 6v0a6 6 0 01-6-6V5a2 2 0 012-2h2m8 0v1a4 4 0 01-8 0V3' /></svg>
                Goals Completed: {data?.stats.goalsCompleted}
              </span>
            </span>
          </div>
          {/* Static XP points on the right */}
          <div className="absolute right-0 top-0 h-full flex items-center gap-2 text-indigo-600 font-semibold bg-white/80 dark:bg-gray-800/80 pl-4 pr-2 rounded-l-xl shadow">
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-2 bg-indigo-500 rounded-full"
                style={{ width: `${(data?.profile.experiencePoints || 0) % 100}%` }}
              />
            </div>
            {data?.profile.experiencePoints} XP
          </div>
        </div>
        {/* Add marquee animation style */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        `}</style>
      </div>
      {/* Header with Welcome and Recent Habit Wins */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Welcome back, {userName}
          </h1>
          <div className="lg:ml-8 flex-shrink-0">
            <RecentHabitWins wins={data?.recentWins} />
          </div>
        </div>
      </motion.div>

      {/* Main 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Center Column (Main Feed) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-full">
                <QuickAccess />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <TargetedContentFeed />
              </motion.div>
              <div>
                <ContentLibraryGrid />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Self-Development, Stats) */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex justify-end w-full">
              <RightColumn />
            </div>
          </motion.div>
          {/* GamificationStats removed from right column */}
        </div>
      </div>
    </div>
  );
}

const DashboardSkeleton = () => (
    <div className="p-8">
        <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    </div>
);
