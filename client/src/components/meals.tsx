// MealsPage.tsx

import React, { useState } from 'react';

interface FoodItem {
  name: string;
  calories: number;
}

interface MealsPageProps {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  dailyGoal: number;
}

const Meals: React.FC<MealsPageProps> = ({ breakfast, lunch, dinner, dailyGoal }) => {
  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<number>(0);
  const [addedFoods, setAddedFoods] = useState<FoodItem[]>([]);

  const addFood = () => {
    if (foodName && calories > 0) {
      const newFoodItem: FoodItem = { name: foodName, calories };
      setAddedFoods([...addedFoods, newFoodItem]);
      setFoodName('');
      setCalories(0);
    }
  };

  const calculateTotalCalories = (meal: FoodItem[]) => {
    return meal.reduce((total, food) => total + food.calories, 0);
  };

  const calculateRemainingCalories = () => {
    const totalCalories = calculateTotalCalories(addedFoods);
    return dailyGoal - totalCalories;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Meals Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Add Food</h2>
          <div className="flex items-center mb-2">
            <label className="mr-2">Food Name:</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(parseInt(e.target.value, 10))}
              className="border p-2 rounded-md"
            />
          </div>
          <button onClick={addFood} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Add Food
          </button>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Today's Menu</h2>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Breakfast</h3>
            <ul>
              {breakfast.map((food, index) => (
                <li key={index}>{food.name} - {food.calories} kcal</li>
              ))}
            </ul>
            <p>Total Calories: {calculateTotalCalories(breakfast)} kcal</p>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Lunch</h3>
            <ul>
              {lunch.map((food, index) => (
                <li key={index}>{food.name} - {food.calories} kcal</li>
              ))}
            </ul>
            <p>Total Calories: {calculateTotalCalories(lunch)} kcal</p>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Dinner</h3>
            <ul>
              {dinner.map((food, index) => (
                <li key={index}>{food.name} - {food.calories} kcal</li>
              ))}
            </ul>
            <p>Total Calories: {calculateTotalCalories(dinner)} kcal</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Daily Calorie Goal</h2>
        <p>
          Total Calories Consumed: {calculateTotalCalories(addedFoods)} kcal
        </p>
        <p>
          Remaining Calories: {calculateRemainingCalories()} kcal
        </p>
        <p>
          Daily Goal: {dailyGoal} kcal
        </p>
      </div>
    </div>
  );
};

export default Meals;
    