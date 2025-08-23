// File: components/onboarding/OutcomesStep.tsx
import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

// --- TypeScript Interfaces ---
interface OnboardingData {
  outcomes: {
    selectedOutcomes: string[];
  };
  // ... other properties
}
interface Props {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}

// --- Data for the options ---
const outcomeOptions = [
  { id: "clarity_focus", label: "Achieve Clarity & Focus", icon: "🎯", description: "Define your priorities and eliminate distractions." },
  { id: "boost_productivity", label: "Boost Productivity", icon: "🚀", description: "Master your time and get more done." },
  { id: "advance_career", label: "Advance Your Career", icon: "💼", description: "Develop key skills and increase your influence." },
  { id: "enhance_wellbeing", label: "Enhance Well-being", icon: "🧘", description: "Reduce stress and build mental resilience." },
  { id: "lead_confidence", label: "Lead with Confidence", icon: "👑", description: "Inspire your team and command respect." },
  { id: "master_skill", label: "Master a New Skill", icon: "🛠️", description: "Accelerate your learning and expertise." },
];

// The "export" keyword here makes it a named export, fixing the error.
export function OutcomesStep({ data, setData }: Props) {
  const handleSelect = (outcomeId: string) => {
    const currentSelection = data.outcomes.selectedOutcomes;
    const newSelection = currentSelection.includes(outcomeId)
      ? currentSelection.filter((g) => g !== outcomeId)
      : currentSelection.length < 3
      ? [...currentSelection, outcomeId]
      : currentSelection;

    setData((prev) => ({
      ...prev,
      outcomes: { ...prev.outcomes, selectedOutcomes: newSelection },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          What are your primary goals?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Select up to 3 outcomes you want to achieve. This will help us personalize your experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outcomeOptions.map((outcome) => (
            <button
              key={outcome.id}
              onClick={() => handleSelect(outcome.id)}
              disabled={!data.outcomes.selectedOutcomes.includes(outcome.id) && data.outcomes.selectedOutcomes.length >= 3}
              className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-4 text-left ${
                data.outcomes.selectedOutcomes.includes(outcome.id)
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-300"
                  : "border-gray-300 dark:border-gray-600 hover:border-indigo-400"
              } ${!data.outcomes.selectedOutcomes.includes(outcome.id) && data.outcomes.selectedOutcomes.length >= 3 ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <span className="text-3xl">{outcome.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{outcome.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{outcome.description}</div>
              </div>
              {data.outcomes.selectedOutcomes.includes(outcome.id) && (
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          {data.outcomes.selectedOutcomes.length} of 3 selected
        </div>
      </div>
    </div>
  );
}
