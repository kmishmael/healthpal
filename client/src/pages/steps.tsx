import React, { useState, Fragment } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { cn } from "../lib/utils";
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

interface StepsPageProps {
  totalSteps: number;
  weeklySteps: number[];
}

const Steps: React.FC<StepsPageProps> = ({ totalSteps, weeklySteps }) => {
  const [loggedSteps, setLoggedSteps] = useState<number>(0);
  let [isOpen, setIsOpen] = useState(false);

  const handleLogSteps = () => {
    // Handle the logic to log steps, e.g., send to the server, update state, etc.
    // For simplicity, I'll just update the state in this example
    setLoggedSteps(loggedSteps + 1000); // Assume the user logged 1000 steps
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: weeklySteps,
        borderColor: "transparent",
        borderWidth: 2,
        backgroundColor: "rgba(30, 66, 159, 1)",
        pointRadius: 5,
        fill: true,
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

  const stepsdistribution = [
    { label: "s", value: 50 },
    { label: "M", value: 60 },
    { label: "T", value: 80 },
    { label: "W", value: 100 },
    { label: "T", value: 60 },
    { label: "F", value: 100 },
    { label: "S", value: 90 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Steps Overview</h1>

      <div className="flex flex-col gap-5 p-6 w-full border border-red rounded shadow-md">
        <div className="flex justify-between items-center">
          <p className="text-6xl text-blue-600 font-bold">5155</p>
          <button
            onClick={() => setIsOpen(true)}
            className="text-3xl outline-transparent bg-gray-200 rounded-full p-4 hover:bg-blue-200 hover:text-blue-600 duration-150 transition-colors ease-in flex items-center justify-center m-0"
          >
            <FaPlus className="h-6 w-6" />
          </button>
        </div>
        <div className="flex w-full justify-between font-medium text-lg">
          <span>/6000 Steps</span>
          <span>Daily avg 5650</span>
          <div className="hidden">{totalSteps}</div>
        </div>
        <div className="w-full">
          <div className="bg-blue-200 h-5 rounded-full relative">
            <div
              style={{ width: `calc(5155/6000 * 100%)` }}
              className="bg-blue-800 h-5 z-10 rounded-full absolute top-0 left-0"
            ></div>
          </div>
        </div>

        <>
          {/* <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>
      </div> */}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Logs Steps
                      </Dialog.Title>
                      <div className="mt-2">
                        <input className="rounded font-bold" type="text" />
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Submit
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>

        <div className="flex w-full flex-row gap-6">
          {stepsdistribution.map((dist) => (
            <div className="flex flex-col items-center gap-2">
              <CircularProgress className="h-8 w-8" progress={dist.value} />
              <p className="font-bold text-lg uppercase text-blue-600">
                {dist.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 mt-8 w-full">
        <h2 className="text-lg font-semibold mb-2">
          Weekly Steps Distribution
        </h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Log Steps</h2>
        <div className="flex items-center">
          <input
            type="number"
            value={loggedSteps}
            onChange={(e) => setLoggedSteps(Number(e.target.value))}
            className="border rounded-md p-2 mr-2"
          />
          <button
            onClick={handleLogSteps}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Log Steps
          </button>
        </div>
      </div>
      <div>
        <p>
          <strong>Note:</strong> The goal is set at 6000 steps per day.
        </p>
      </div>
    </div>
  );
};

export default Steps;

type CircularProgressProps = {
  progress: number;
  className?: string;
};
const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  className,
  ...props
}) => {
  const strokeWidth = 12; // Adjust the strokeWidth as needed
  const radius = 40; // Adjust the radius as needed
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn(`w-20 h-20 relative`, className)} {...props}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="progress-ring__background"
          stroke="#f3f4f6" // Background color
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="progress-ring__progress"
          stroke="#60a5fa" // Progress color
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform={`rotate(-90, 50, 50)`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"></div>
    </div>
  );
};
