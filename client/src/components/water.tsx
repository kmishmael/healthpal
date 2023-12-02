// WaterPage.tsx

import React, { useState } from 'react';

interface WaterPageProps {
  dailyGoal: number;
}

const Water: React.FC<WaterPageProps> = ({ dailyGoal }) => {
  const [waterIntake, setWaterIntake] = useState<number>(0);

  const logWater = () => {
    if (waterIntake > 0) {
      // Handle logging water intake (you can update your state or send data to the server)
      alert(`Logged ${waterIntake} ml of water!`);
      setWaterIntake(0);
    }
  };

  const remainingWater = dailyGoal - waterIntake;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Water Page</h1>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-2">Log Water Intake</h2>
        <div className="flex items-center mb-2">
          <label className="mr-2">Amount (ml):</label>
          <input
            type="number"
            value={waterIntake}
            onChange={(e) => setWaterIntake(parseInt(e.target.value, 10))}
            className="border p-2 rounded-md"
          />
        </div>
        <button onClick={logWater} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Log Water
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Daily Water Goal</h2>
        <p>
          Total Water Intake: {waterIntake} ml
        </p>
        <p>
          Remaining Water: {remainingWater} ml
        </p>
        <p>
          Daily Goal: {dailyGoal} ml
        </p>
      </div>
    </div>
  );
};

export default Water;
