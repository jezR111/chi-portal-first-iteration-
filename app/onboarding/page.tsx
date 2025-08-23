// app/onboarding/page.tsx

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckIcon,
  UserIcon,
  RocketLaunchIcon,
  TrophyIcon, // 👈 It was missing from this list
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

// Import all the step components from their separate files
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { StageAndGoalsStep } from "@/components/onboarding/StageAndGoalsStep";
import { OutcomesStep } from "@/components/onboarding/OutcomesStep";

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // This state structure matches your desired onboarding flow
  const [onboardingData, setOnboardingData] = useState({
    personalInfo: {
      displayName: session?.user?.name || "",
      currentRole: "",
      biggestChallenge: "",
      motivationLevel: 3,
    },
    stageAndGoals: {
      developmentStage: "exploring", // A sensible default
      areas: [] as string[],
    },
    outcomes: {
      selectedOutcomes: [] as string[],
    },
  });

  // This is your desired 3-step onboarding flow
  const steps: OnboardingStep[] = [
    {
      id: "personal",
      title: "Tell Us About Yourself",
      subtitle: "This helps us tailor your experience.",
      icon: <UserIcon className="w-8 h-8" />,
      component: <PersonalInfoStep data={onboardingData} setData={setOnboardingData} />,
    },
    {
      id: "stage-goals",
      title: "Your Journey, Your Pace",
      subtitle: "Where are you right now, and where do you want to go?",
      icon: <TrophyIcon className="w-8 h-8" />,
      component: <StageAndGoalsStep data={onboardingData} setData={setOnboardingData} />,
    },
    {
      id: "outcomes",
      title: "Define Your Desired Outcomes",
      subtitle: "What are you aiming to achieve with us?",
      icon: <RocketLaunchIcon className="w-8 h-8" />,
      component: <OutcomesStep data={onboardingData} setData={setOnboardingData} />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        throw new Error("Failed to complete onboarding");
      }

      await update();
      toast.success("Setup complete. Welcome aboard!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ProgressBar progress={progress} />
          <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4 text-indigo-600">
                {steps[currentStep].icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="mb-8">{steps[currentStep].component}</div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={handleNext} className="flex items-center">
                {currentStep === steps.length - 1 ? (
                  <>
                    Complete Setup
                    <CheckIcon className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {currentStep < steps.length - 1 && (
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
