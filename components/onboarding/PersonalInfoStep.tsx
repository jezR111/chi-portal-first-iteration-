// File: components/onboarding/PersonalInfoStep.tsx
import React from "react";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

// --- TypeScript Interfaces ---
interface PersonalInfo {
  displayName: string;
  currentRole: string;
  biggestChallenge: string;
  motivationLevel: number;
}
interface OnboardingData {
  personalInfo: PersonalInfo;
  // ... other properties
}
interface Props {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

// --- Main Component ---
// The "export" keyword here makes it a named export, which fixes the error.
export function PersonalInfoStep({ data, setData }: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'range' ? parseInt(value, 10) : value;

    setData((prevData) => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        [name]: finalValue,
      },
    }));
  };

  const motivationLabels: { [key: number]: string } = {
    1: "Just exploring",
    3: "Ready to start",
    5: "Highly committed",
  };

  const motivationProgress = ((data.personalInfo.motivationLevel - 1) * 100) / 4;

  return (
    <div className="space-y-8">
      {/* Display Name Field */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Display Name
        </label>
        <Input
          id="displayName"
          name="displayName"
          type="text"
          placeholder="How you'll appear to others"
          value={data.personalInfo.displayName}
          onChange={handleChange}
        />
      </motion.div>

      {/* Current Role Field */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Title / Current Role (Optional)
        </label>
        <Input
          id="currentRole"
          name="currentRole"
          type="text"
          placeholder="e.g., Project Manager, Student, Founder"
          value={data.personalInfo.currentRole}
          onChange={handleChange}
        />
      </motion.div>

      {/* Biggest Challenge Field */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <label htmlFor="biggestChallenge" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What's your biggest challenge right now? (Optional)
        </label>
        <textarea
          id="biggestChallenge"
          name="biggestChallenge"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          rows={3}
          placeholder="e.g., Managing my time, leading my team, finding work-life balance..."
          value={data.personalInfo.biggestChallenge}
          onChange={handleChange}
        />
      </motion.div>

      {/* Motivation Level Field */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <label htmlFor="motivationLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How serious are you about committing to change?
        </label>
        <div className="relative pt-8">
          <div
            className="absolute -top-1 w-12 text-center"
            style={{ left: `${motivationProgress}%`, transform: 'translateX(-50%)' }}
          >
            <div className="bg-indigo-600 text-white text-sm font-bold rounded-full py-1 shadow-lg">
              {data.personalInfo.motivationLevel}
            </div>
          </div>
          <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-indigo-500"
              style={{ width: `${motivationProgress}%` }}
            />
            <input
              id="motivationLevel"
              name="motivationLevel"
              type="range"
              min="1"
              max="5"
              step="1"
              value={data.personalInfo.motivationLevel}
              onChange={handleChange}
              className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{motivationLabels[1]}</span>
          <span className="text-center">{motivationLabels[3]}</span>
          <span className="text-right">{motivationLabels[5]}</span>
        </div>
      </motion.div>
    </div>
  );
}
