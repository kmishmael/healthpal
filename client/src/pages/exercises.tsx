// App.tsx

import React from 'react';
import Exercises from '../components/exercises';

const ExercisesPage: React.FC = () => {
  // Mock data (replace with real data or fetch from API)
  const dailyCaloriesGoal = 2500; // Assuming a daily goal of 2500 kcal

  return (
    <div>
      {/* Other components */}
      <Exercises dailyCaloriesGoal={dailyCaloriesGoal} />
    </div>
  );
};

export default ExercisesPage;
