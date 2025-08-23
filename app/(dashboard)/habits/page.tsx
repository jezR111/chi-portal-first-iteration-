// app/(dashboard)/habits/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  PlusIcon,
  FireIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChartBarIcon,
  CalendarIcon,
  TrophyIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns";

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  targetCount: number;
  color: string;
  icon: string;
  active: boolean;
  currentStreak: number;
  bestStreak: number;
  completionRate: number;
  entries: HabitEntry[];
}

interface HabitEntry {
  id: string;
  date: string;
  completed: boolean;
  notes?: string;
}

const HABIT_CATEGORIES = [
  { value: "health", label: "Health & Fitness", icon: "💪" },
  { value: "mindfulness", label: "Mindfulness", icon: "🧘" },
  { value: "learning", label: "Learning", icon: "📚" },
  { value: "productivity", label: "Productivity", icon: "⚡" },
  { value: "relationships", label: "Relationships", icon: "❤️" },
  { value: "creativity", label: "Creativity", icon: "🎨" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "other", label: "Other", icon: "✨" },
];

const HABIT_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#F97316", // Orange
];

export default function HabitsPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("daily");

  // Fetch habits
  const { data: habits = [], isLoading } = useQuery<Habit[]>({
    queryKey: ["habits", session?.user?.id],
    queryFn: async () => {
      const response = await fetch("/api/habits");
      if (!response.ok) throw new Error("Failed to fetch habits");
      return response.json();
    },
    enabled: !!session?.user?.id,
  });

  // Toggle habit completion
  const toggleHabitMutation = useMutation({
    mutationFn: async ({ habitId, date }: { habitId: string; date: Date }) => {
      const response = await fetch(`/api/habits/${habitId}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: format(date, "yyyy-MM-dd") }),
      });
      if (!response.ok) throw new Error("Failed to toggle habit");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit updated!");
    },
  });

  // Create/Update habit
  const saveHabitMutation = useMutation({
    mutationFn: async (habitData: any) => {
      const url = editingHabit
        ? `/api/habits/${editingHabit.id}`
        : "/api/habits";
      const method = editingHabit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });
      if (!response.ok) throw new Error("Failed to save habit");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success(editingHabit ? "Habit updated!" : "Habit created!");
      setShowAddModal(false);
      setEditingHabit(null);
    },
  });

  // Delete habit
  const deleteHabitMutation = useMutation({
    mutationFn: async (habitId: string) => {
      const response = await fetch(`/api/habits/${habitId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete habit");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast.success("Habit deleted");
    },
  });

  const handleToggleHabit = (habitId: string) => {
    toggleHabitMutation.mutate({ habitId, date: selectedDate });
  };

  const isHabitCompletedOnDate = (habit: Habit, date: Date) => {
    return habit.entries.some((entry) =>
      isSameDay(parseISO(entry.date), date) && entry.completed
    );
  };

  const getWeekDates = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const calculateStats = () => {
    const totalHabits = habits.length;
    const completedToday = habits.filter((h) =>
      isHabitCompletedOnDate(h, selectedDate)
    ).length;
    const overallStreak = Math.max(...habits.map((h) => h.currentStreak || 0), 0);
    const avgCompletionRate =
      habits.reduce((acc, h) => acc + (h.completionRate || 0), 0) / totalHabits || 0;

    return {
      totalHabits,
      completedToday,
      overallStreak,
      avgCompletionRate,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Habit Tracker
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Build consistency, achieve greatness
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Habit
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <StatsCard
              icon={<CheckCircleIcon className="w-6 h-6" />}
              label="Completed Today"
              value={`${stats.completedToday}/${stats.totalHabits}`}
              color="bg-green-500"
            />
            <StatsCard
              icon={<FireIcon className="w-6 h-6" />}
              label="Best Streak"
              value={`${stats.overallStreak} days`}
              color="bg-orange-500"
            />
            <StatsCard
              icon={<ChartBarIcon className="w-6 h-6" />}
              label="Completion Rate"
              value={`${Math.round(stats.avgCompletionRate)}%`}
              color="bg-blue-500"
            />
            <StatsCard
              icon={<TrophyIcon className="w-6 h-6" />}
              label="Active Habits"
              value={stats.totalHabits.toString()}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-medium">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex space-x-2">
            {["daily", "weekly", "monthly"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  viewMode === mode
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Habits Grid */}
        {viewMode === "daily" && (
          <DailyView
            habits={habits}
            selectedDate={selectedDate}
            onToggleHabit={handleToggleHabit}
            onEditHabit={setEditingHabit}
            onDeleteHabit={(id) => deleteHabitMutation.mutate(id)}
            isHabitCompletedOnDate={isHabitCompletedOnDate}
          />
        )}

        {viewMode === "weekly" && (
          <WeeklyView
            habits={habits}
            weekDates={getWeekDates()}
            isHabitCompletedOnDate={isHabitCompletedOnDate}
          />
        )}

        {viewMode === "monthly" && (
          <MonthlyView
            habits={habits}
            selectedDate={selectedDate}
            isHabitCompletedOnDate={isHabitCompletedOnDate}
          />
        )}
      </div>

      {/* Add/Edit Habit Modal */}
      <HabitModal
        isOpen={showAddModal || !!editingHabit}
        onClose={() => {
          setShowAddModal(false);
          setEditingHabit(null);
        }}
        onSave={(data) => saveHabitMutation.mutate(data)}
        habit={editingHabit}
      />
    </div>
  );
}

// Components
function StatsCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center">
        <div className={`${color} text-white p-2 rounded-lg mr-3`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DailyView({ habits, selectedDate, onToggleHabit, onEditHabit, onDeleteHabit, isHabitCompletedOnDate }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {habits.map((habit: Habit) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{habit.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {habit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {habit.category}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => onEditHabit(habit)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <PencilIcon className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => onDeleteHabit(habit.id)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <TrashIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {habit.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {habit.description}
              </p>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {habit.currentStreak || 0}
                  </p>
                  <p className="text-xs text-gray-500">Current</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">
                    {habit.bestStreak || 0}
                  </p>
                  <p className="text-xs text-gray-500">Best</p>
                </div>
              </div>
              <button
                onClick={() => onToggleHabit(habit.id)}
                className={`p-4 rounded-full transition-all ${
                  isHabitCompletedOnDate(habit, selectedDate)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >
                <CheckCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${habit.completionRate || 0}%` }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function WeeklyView({ habits, weekDates, isHabitCompletedOnDate }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left p-4 font-medium text-gray-900 dark:text-white">
              Habit
            </th>
            {weekDates.map((date: Date) => (
              <th key={date.toISOString()} className="text-center p-2">
                <div className="text-xs text-gray-500">{format(date, "EEE")}</div>
                <div className="text-sm font-medium">{format(date, "d")}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit: Habit) => (
            <tr key={habit.id} className="border-b border-gray-100 dark:border-gray-700">
              <td className="p-4">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{habit.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {habit.title}
                  </span>
                </div>
              </td>
              {weekDates.map((date: Date) => (
                <td key={date.toISOString()} className="text-center p-2">
                  <div
                    className={`w-8 h-8 mx-auto rounded-full ${
                      isHabitCompletedOnDate(habit, date)
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MonthlyView({ habits, selectedDate, isHabitCompletedOnDate }: any) {
  // Implementation for monthly calendar view
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <p className="text-center text-gray-500">Monthly view coming soon...</p>
    </div>
  );
}

function HabitModal({ isOpen, onClose, onSave, habit }: any) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "health",
    frequency: "DAILY",
    targetCount: 1,
    color: HABIT_COLORS[0],
    icon: "✨",
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        title: habit.title,
        description: habit.description || "",
        category: habit.category,
        frequency: habit.frequency,
        targetCount: habit.targetCount,
        color: habit.color,
        icon: habit.icon,
      });
    }
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={habit ? "Edit Habit" : "Create New Habit"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Morning Meditation"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            rows={2}
            placeholder="Add details about this habit..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          >
            {HABIT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frequency
          </label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Color
          </label>
          <div className="flex space-x-2">
            {HABIT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-full ${
                  formData.color === color ? "ring-2 ring-offset-2 ring-indigo-500" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {habit ? "Update" : "Create"} Habit
          </Button>
        </div>
      </form>
    </Modal>
  );
}