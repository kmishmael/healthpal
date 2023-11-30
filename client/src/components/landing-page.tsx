// src/components/LandingPage.tsx
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full text-center">
        

        {/* Additional Sections/Features (placeholders) */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2 text-gray-800">Exercise Tracking</h3>
              <p className="text-gray-600">
                Log your workouts and track your progress with our easy-to-use exercise tracker.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2 text-gray-800">Meal Planning</h3>
              <p className="text-gray-600">
                Plan and monitor your meals to maintain a balanced and healthy diet effortlessly.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-xl font-medium mb-2 text-gray-800">Hydration Monitor</h3>
              <p className="text-gray-600">
                Stay hydrated by tracking your daily water intake with our hydration monitor.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section (placeholders) */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <p className="text-gray-600">
                "HealthPal has transformed the way I approach my fitness journey. It's intuitive and
                user-friendly."
              </p>
              <p className="text-gray-800 font-semibold mt-2">- Emily, Fitness Enthusiast</p>
            </div>
            {/* Testimonial 2 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <p className="text-gray-600">
                "I love how HealthPal helps me stay on top of my health goals. It's a game-changer!"
              </p>
              <p className="text-gray-800 font-semibold mt-2">- Alex, Wellness Advocate</p>
            </div>
            {/* Testimonial 3 */}
            <div className="p-4 bg-white rounded-md shadow-md">
              <p className="text-gray-600">
                "The simplicity of HealthPal makes it the perfect companion for my daily health
                routines."
              </p>
              <p className="text-gray-800 font-semibold mt-2">- Chris, Health Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
