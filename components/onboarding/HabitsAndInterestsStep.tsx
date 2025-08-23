"use client";

import { CheckIcon } from "@heroicons/react/24/outline";

interface HabitsAndInterestsStepProps {
  data: any;
  setData: (data: any) => void;
}

export function HabitsAndInterestsStep({ data, setData }: HabitsAndInterestsStepProps) {
  const habitOptions = [
    { id: "meditation", label: "Daily Meditation", icon: "🧘", category: "Mindfulness" },
    { id: "exercise", label: "Exercise", icon: "💪", category: "Health" },
    { id: "reading", label: "Read 30 minutes", icon: "📖", category: "Learning" },
    { id: "water", label: "Drink 8 glasses of water", icon: "💧", category: "Health" },
    { id: "gratitude", label: "Gratitude journal", icon: "🙏", category: "Mindfulness" },
    { id: "sleep", label: "8 hours of sleep", icon: "😴", category: "Health" },
    { id: "noPhone", label: "No phone before bed", icon: "📵", category: "Digital Wellness" },
    { id: "learn", label: "Learn something new", icon: "🎓", category: "Learning" },
    { id: "nature", label: "Spend time in nature", icon: "🌳", category: "Wellness" },
    { id: "creative", label: "Creative activity", icon: "🎨", category: "Creativity" },
    { id: "connect", label: "Connect with loved ones", icon: "❤️", category: "Relationships" },
    { id: "planning", label: "Daily planning", icon: "📝", category: "Productivity" },
  ];

  const interestOptions = [
    { id: "psychology", label: "Psychology", icon: "🧠" },
    { id: "philosophy", label: "Philosophy", icon: "💭" },
    { id: "business", label: "Business", icon: "💼" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "arts", label: "Arts & Culture", icon: "🎭" },
    { id: "science", label: "Science", icon: "🔬" },
    { id: "spirituality", label: "Spirituality", icon: "🕉️" },
    { id: "fitness", label: "Fitness", icon: "🏃" },
    { id: "nutrition", label: "Nutrition", icon: "🥗" },
    { id: "finance", label: "Finance", icon: "📈" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "music", label: "Music", icon: "🎵" },
  ];

  return (
    <div className="space-y-8">
      {/* Habits Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Select habits to track
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
          {habitOptions.map((habit) => (
            <button
              key={habit.id}
              onClick={() => {
                const newHabits = data.habitsAndInterests.habits.includes(habit.id)
                  ? data.habitsAndInterests.habits.filter((h: string) => h !== habit.id)
                  : [...data.habitsAndInterests.habits, habit.id];
                setData({
                  ...data,
                  habitsAndInterests: {
                    ...data.habitsAndInterests,
                    habits: newHabits,
                  },
                });
              }}
              className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-3 text-left ${
                data.habitsAndInterests.habits.includes(habit.id)
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
              }`}
            >
              <span className="text-xl">{habit.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{habit.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {habit.category}
                </div>
              </div>
              {data.habitsAndInterests.habits.includes(habit.id) && (
                <CheckIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {data.habitsAndInterests.habits.length} habit{data.habitsAndInterests.habits.length !== 1 ? "s" : ""} selected
        </div>
      </div>

      {/* Interests Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What are your interests?
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {interestOptions.map((interest) => (
            <button
              key={interest.id}
              onClick={() => {
                const newInterests = data.habitsAndInterests.interests.includes(interest.id)
                  ? data.habitsAndInterests.interests.filter((i: string) => i !== interest.id)
                  : [...data.habitsAndInterests.interests, interest.id];
                setData({
                  ...data,
                  habitsAndInterests: {
                    ...data.habitsAndInterests,
                    interests: newInterests,
                  },
                });
              }}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                data.habitsAndInterests.interests.includes(interest.id)
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="text-2xl mb-1">{interest.icon}</div>
              <div className="text-xs font-medium">{interest.label}</div>
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {data.habitsAndInterests.interests.length} interest{data.habitsAndInterests.interests.length !== 1 ? "s" : ""} selected
        </div>
      </div>

      {/* Clear buttons */}
      <div className="flex justify-between text-xs">
        {data.habitsAndInterests.habits.length > 0 && (
          <button
            onClick={() =>
              setData({
                ...data,
                habitsAndInterests: {
                  ...data.habitsAndInterests,
                  habits: [],
                },
              })
            }
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear habits
          </button>
        )}
        {data.habitsAndInterests.interests.length > 0 && (
          <button
            onClick={() =>
              setData({
                ...data,
                habitsAndInterests: {
                  ...data.habitsAndInterests,
                  interests: [],
                },
              })
            }
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear interests
          </button>
        )}
      </div>
    </div>
  );
}