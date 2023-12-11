// Dashboard.tsx

import React from "react";

interface DashboardProps {
  calories: number;
  steps: number;
  waterIntake: number;
  sleepTime: number;
  exercises: number;
  foods: number;
  meals: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  calories,
  steps,
  waterIntake,
  sleepTime,
  exercises,
  foods,
  meals,
}) => {
  return (
    <>
      <div className="p-4 h-screen overflow-x-auto">
        <h1 className="text-2xl font-semibold mb-4">Today's Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            icon="🔥"
            title="Calories"
            value={calories}
            maxValue={2000}
            unit="kcal"
          />
          <DashboardCard icon="👣" title="Steps" value={steps} unit="steps" />
          <DashboardCard
            icon="💧"
            title="Water Intake"
            value={waterIntake}
            unit="ml"
          />
          <DashboardCard
            icon="😴"
            title="Sleep Time"
            value={sleepTime}
            unit="hours"
          />
          <DashboardCard
            icon="🏋️‍♂️"
            title="Exercises"
            value={exercises}
            unit="minutes"
          />
          <DashboardCard icon="🍔" title="Foods" value={foods} />
          <DashboardCard icon="🍽️" title="Meals" value={meals} />
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            {/* Include your chart or visualization here */}
            {/* You can use a different chart library or component based on your preference */}
            {/* For simplicity, I'll leave this part as a placeholder */}
            <p>Chart goes here</p>
          </div>
        </div>
      </div>
      
    </>
  );
};

interface DashboardCardProps {
  icon: string;
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  maxValue,
  unit,
}) => {
  const percentage = maxValue ? (value / maxValue) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex items-center mb-2">
        <div className="bg-gray-200 h-4 rounded-full w-full">
          <div
            className="h-full rounded-full bg-green-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <p>
        <span className="font-semibold">{value}</span> {unit || ""}
      </p>
    </div>
  );
};

export default Dashboard;
