// App.tsx

import React from 'react';
import Water from '../components/water';

const WaterPage: React.FC = () => {
  // Mock data (replace with real data or fetch from API)
  const dailyWaterGoal = 2000; // Assuming a daily goal of 2000 ml

  return (
    <div>
      {/* Other components */}
      <Water dailyGoal={dailyWaterGoal} />
    </div>
  );
};

export default WaterPage;
