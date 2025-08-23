// File: app/(dashboard)/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatCard } from "@/components/dashboard/StatCard";
import { FocusAreaCard } from "@/components/dashboard/FocusAreaCard";
import { HabitTrackerWidget } from "@/components/dashboard/HabitTrackerWidget";
import { FireIcon, CheckCircleIcon, TrophyIcon } from "@heroicons/react/24/outline";

// A placeholder for your dashboard data structure
interface DashboardData {
  stats: {
    streak: number;
    habitsCompletedToday: number;
    goalsInProgress: number;
  };
  focusAreas: string[];
  habits: { id: string; title: string; completed: boolean }[];
  profile: {
    currentLevel: number;
    experiencePoints: number;
  };
}

// A placeholder fetch function
const fetchDashboardData = async (): Promise<DashboardData> => {
  // In a real app, you would fetch this from your API
  // For now, we'll return mock data that matches your schema
  return {
    stats: {
      streak: 5,
      habitsCompletedToday: 2,
      goalsInProgress: 3,
    },
    focusAreas: ["Advance My Career", "Enhance Well-being"],
    habits: [
      { id: "1", title: "Read 30 minutes", completed: true },
      { id: "2", title: "Daily Meditation", completed: true },
      { id: "3", title: "Exercise", completed: false },
    ],
    profile: {
      currentLevel: 3,
      experiencePoints: 250,
    },
  };
};

export default function DashboardPage() {
  const { data: session } = useSession();
  
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const userName = session?.user?.displayName || 'User';

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {userName}
        </h1>
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Level {dashboardData?.profile.currentLevel}</span>
          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div 
              className="h-2 bg-indigo-600 rounded-full" 
              style={{ width: `${(dashboardData?.profile.experiencePoints || 0) % 100}%`}}
            />
          </div>
          <span>{dashboardData?.profile.experiencePoints} XP</span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard icon={<FireIcon />} title="Current Streak" value={`${dashboardData?.stats.streak} Days`} color="text-orange-500" />
        <StatCard icon={<CheckCircleIcon />} title="Habits Today" value={`${dashboardData?.stats.habitsCompletedToday} Completed`} color="text-green-500" />
        <StatCard icon={<TrophyIcon />} title="Active Goals" value={`${dashboardData?.stats.goalsInProgress} In Progress`} color="text-yellow-500" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column (Habits) */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <HabitTrackerWidget habits={dashboardData?.habits || []} />
        </motion.div>

        {/* Right Column (Focus Area) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FocusAreaCard focusArea={dashboardData?.focusAreas[0]} />
        </motion.div>
      </div>
    </div>
  );
}

const DashboardSkeleton = () => (
  <div className="p-8">
    <Skeleton className="h-10 w-1/3 mb-2" />
    <Skeleton className="h-6 w-1/4 mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Skeleton className="h-64 w-full lg:col-span-2" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);
