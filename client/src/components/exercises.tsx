// ExercisePage.tsx

import React, { useState } from 'react';

interface Exercise {
  id: number;
  name: string;
  caloriesBurned: number;
}

interface Routine {
  id: number;
  name: string;
  exercises: Exercise[];
}

interface ExercisePageProps {
  dailyCaloriesGoal: number;
}

const Exercises: React.FC<ExercisePageProps> = ({ dailyCaloriesGoal }) => {
  const [exerciseName, setExerciseName] = useState<string>('');
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [exerciseHistory, setExerciseHistory] = useState<Exercise[]>([]);
  const [routineName, setRoutineName] = useState<string>('');
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);

  const logExercise = () => {
    if (exerciseName && caloriesBurned > 0) {
      const newExercise: Exercise = {
        id: Date.now(),
        name: exerciseName,
        caloriesBurned,
      };

      setExerciseHistory([...exerciseHistory, newExercise]);
      setExerciseName('');
      setCaloriesBurned(0);
    }
  };

  const createRoutine = () => {
    if (routineName) {
      const newRoutine: Routine = {
        id: Date.now(),
        name: routineName,
        exercises: [],
      };

      setCurrentRoutine(newRoutine);
      setRoutineName('');
    }
  };

  const addExerciseToRoutine = () => {
    if (currentRoutine && exerciseName && caloriesBurned > 0) {
      const newExercise: Exercise = {
        id: Date.now(),
        name: exerciseName,
        caloriesBurned,
      };

      setCurrentRoutine({
        ...currentRoutine,
        exercises: [...currentRoutine.exercises, newExercise],
      });

      setExerciseName('');
      setCaloriesBurned(0);
    }
  };

  const calculateTotalCaloriesBurned = () => {
    const historyCalories = exerciseHistory.reduce(
      (total, exercise) => total + exercise.caloriesBurned,
      0
    );

    const routineCalories = currentRoutine
      ? currentRoutine.exercises.reduce((total, exercise) => total + exercise.caloriesBurned, 0)
      : 0;

    return historyCalories + routineCalories;
  };

  const remainingCalories = dailyCaloriesGoal - calculateTotalCaloriesBurned();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Exercise Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Log Exercise</h2>
          <div className="flex items-center mb-2">
            <label className="mr-2">Exercise Name:</label>
            <input
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Calories Burned:</label>
            <input
              type="number"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(parseInt(e.target.value, 10))}
              className="border p-2 rounded-md"
            />
          </div>
          <button onClick={logExercise} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Log Exercise
          </button>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Create Routine</h2>
          <div className="flex items-center mb-2">
            <label className="mr-2">Routine Name:</label>
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <button onClick={createRoutine} className="bg-green-500 text-white py-2 px-4 rounded-md">
            Create Routine
          </button>
          {currentRoutine && (
            <>
              <h3 className="text-md font-semibold my-2">Add Exercise to Routine</h3>
              <div className="flex items-center mb-2">
                <label className="mr-2">Exercise Name:</label>
                <input
                  type="text"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  className="border p-2 rounded-md"
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="mr-2">Calories Burned:</label>
                <input
                  type="number"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(parseInt(e.target.value, 10))}
                  className="border p-2 rounded-md"
                />
              </div>
              <button
                onClick={addExerciseToRoutine}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Add Exercise
              </button>
              <h4 className="text-sm font-semibold mt-2">Current Routine: {currentRoutine.name}</h4>
              <ul>
                {currentRoutine.exercises.map((exercise) => (
                  <li key={exercise.id}>
                    {exercise.name} - {exercise.caloriesBurned} kcal
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
        <p>Total Calories Burned: {calculateTotalCaloriesBurned()} kcal</p>
        <p>Remaining Calories: {remainingCalories} kcal</p>
        <p>Daily Goal: {dailyCaloriesGoal} kcal</p>
      </div>
    </div>
  );
};

export default Exercises;
