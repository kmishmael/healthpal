// Dashboard.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';

interface DashboardProps {
  calories: number;
  steps: number;
  waterIntake: number;
  sleepTime: number;
  exercises: number;
  foods: number;
  meals: number;
}

const Dashboard2: React.FC<DashboardProps> = ({
  calories,
  steps,
  waterIntake,
  sleepTime,
  exercises,
  foods,
  meals,
}) => {
  // Mock data for the bar chart
  const chartData = {
    labels: ['Calories', 'Steps', 'Water', 'Sleep', 'Exercises', 'Foods', 'Meals'],
    datasets: [
      {
        label: 'Today',
        data: [calories, steps, waterIntake, sleepTime, exercises, foods, meals],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Today's Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Calories</h2>
          <p>{calories} kcal</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Steps</h2>
          <p>{steps} steps</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Water Intake</h2>
          <p>{waterIntake} ml</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Sleep Time</h2>
          <p>{sleepTime} hours</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Exercises</h2>
          <p>{exercises} minutes</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Foods</h2>
          <p>{foods}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Meals</h2>
          <p>{meals}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Overview Chart</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard2;
