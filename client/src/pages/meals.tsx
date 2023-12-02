// App.tsx

import React from 'react';
import Meals from '../components/meals';

const MealsPage: React.FC = () => {
  // Mock data (replace with real data or fetch from API)
  const breakfast = [
    { name: 'Oatmeal', calories: 300 },
    { name: 'Banana', calories: 100 },
  ];

  const lunch = [
    { name: 'Grilled Chicken Salad', calories: 500 },
    { name: 'Brown Rice', calories: 200 },
  ];

  const dinner = [
    { name: 'Salmon', calories: 400 },
    { name: 'Quinoa', calories: 150 },
  ];

  const dailyGoal = 2000;

  return (
    <div>
      {/* Other components */}
      <Meals breakfast={breakfast} lunch={lunch} dinner={dinner} dailyGoal={dailyGoal} />
    </div>
  );
};

export default MealsPage;
