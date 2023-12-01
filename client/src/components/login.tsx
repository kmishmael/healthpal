// Login.tsx

import React, { useEffect, useState } from "react";

/*
interface LoginProps {
  onSubmit: (formData: LoginFormData) => void;
}
*/

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    generateStars(); // Generate stars when the component mounts
    setInterval(
      () => {
        shower();
      },
      6000,
      Infinity
    );
  }, []);

  const generateStars = () => {
    const starsContainer = document.getElementById("stars-container");

    if (starsContainer) {
      for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
      }
    }
  };

  const shower = (): void => {
    const starsContainer = document.getElementById("stars-container");

    const left = Math.random() * window.outerWidth;
    const top = Math.random() * window.outerHeight;
    const duration = (Math.random() * 70000) / 10 + 3000;

    const div = document.createElement("div");
    div.className = "meteor";
    div.style.top = top - 300 + "px";
    div.style.left = left + "px";
    if (starsContainer) {
      starsContainer.append(div);
    }

    const animation = div.animate(
      [
        {
          offset: 0,
          opacity: 1,
          marginTop: "-300px",
          marginRight: "-300px",
        },
        { offset: 0.12, opacity: 0 },
        {
          offset: 0.15,
          opacity: 0,
          marginTop: "300px",
          marginLeft: "-600px",
        },
        { offset: 1, opacity: 0, width: 0 },
      ],
      { duration: duration, easing: "linear" }
    );

    animation.onfinish = () => div.remove();
  };

  const onSubmit = (_formData: LoginFormData): void => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="relative h-screen bg-black z-10 flex justify-center items-center w-full">
      <div id="stars-container" className="stars-container"></div>
      <div className="max-w-md min-w-[384px] mx-auto p-6 bg-white shadow-md rounded-md relative z-10">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Remember Me</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
