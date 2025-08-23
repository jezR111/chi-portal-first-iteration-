"use client";

interface StageAndGoalsStepProps {
  data: any;
  setData: (data: any) => void;
}

export function StageAndGoalsStep({ data, setData }: StageAndGoalsStepProps) {
  const developmentStages = [
    {
      id: "exploring",
      label: "Exploring",
      description: "Just starting to discover personal development",
      icon: "🌱",
    },
    {
      id: "building",
      label: "Building",
      description: "Actively developing new habits and skills",
      icon: "🏗️",
    },
    {
      id: "growing",
      label: "Growing",
      description: "Seeing progress and refining my approach",
      icon: "🌿",
    },
    {
      id: "mastering",
      label: "Mastering",
      description: "Deep practice and helping others grow",
      icon: "🌟",
    },
  ];

  const areas = [
    { id: "self", label: "Self", icon: "🌟", description: "Personal growth & self-awareness" },
    { id: "connection", label: "Connection", icon: "🤝", description: "Relationships & community" },
    { id: "physical", label: "Physical", icon: "💪", description: "Health, fitness & wellness" },
    { id: "mental", label: "Mental", icon: "🧠", description: "Knowledge & cognitive growth" },
    { id: "spiritual", label: "Spiritual", icon: "🕊️", description: "Purpose & inner peace" },
    { id: "wealth", label: "Wealth", icon: "💰", description: "Financial growth & abundance" },
    { id: "lifestyle", label: "Lifestyle", icon: "✨", description: "Quality of life & experiences" },
    { id: "creation", label: "Creation", icon: "🎨", description: "Creativity & innovation" },
  ];

  return (
    <div className="space-y-8">
      {/* Development Stage */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          What stage of self-development are you in?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {developmentStages.map((stage) => (
            <button
              key={stage.id}
              onClick={() =>
                setData({
                  ...data,
                  stageAndGoals: {
                    ...data.stageAndGoals,
                    developmentStage: stage.id,
                  },
                })
              }
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                data.stageAndGoals.developmentStage === stage.id
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{stage.icon}</span>
                <div>
                  <div className="font-medium mb-1">{stage.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stage.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Goal Areas */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Areas of focus
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choose up to 3 life areas you want to focus on
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => {
                const newAreas = data.stageAndGoals.areas.includes(area.id)
                  ? data.stageAndGoals.areas.filter((a: string) => a !== area.id)
                  : data.stageAndGoals.areas.length < 3
                  ? [...data.stageAndGoals.areas, area.id]
                  : data.stageAndGoals.areas;
                setData({
                  ...data,
                  stageAndGoals: { ...data.stageAndGoals, areas: newAreas },
                });
              }}
              disabled={
                !data.stageAndGoals.areas.includes(area.id) && 
                data.stageAndGoals.areas.length >= 3
              }
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                data.stageAndGoals.areas.includes(area.id)
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                  : "border-gray-300 dark:border-gray-600"
              } ${
                !data.stageAndGoals.areas.includes(area.id) && 
                data.stageAndGoals.areas.length >= 3
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <div className="text-2xl mb-2">{area.icon}</div>
              <div className="font-medium text-sm">{area.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {area.description}
              </div>
            </button>
          ))}
        </div>
        {data.stageAndGoals.areas.length > 0 && (
          <div className="text-center text-sm text-gray-500 mt-4">
            {data.stageAndGoals.areas.length} of 3 areas selected
          </div>
        )}
      </div>
    </div>
  );
}