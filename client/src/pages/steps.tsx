import React, { useState, Fragment, useEffect } from "react";
//import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { cn } from "../lib/utils";
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../provider/auth-provider";
import { API_URL } from "../constats";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DAYS_OF_WEEK } from "../constats";

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "../components/ui/card";
import { ResponsiveLine } from "@nivo/line";

interface StepsPageProps {
  totalSteps: number;
  weeklySteps: number[];
}

const retrieveSteps = async (userId: any) => {
  const response = await axios.get(API_URL + `steps/${userId}`);
  return response.data.data;
};

const logSteps = async (userId: any, steps: number) => {
  const response = await axios.get(API_URL + `steps/${userId}`);
  return response.data;
};

const Steps: React.FC<StepsPageProps> = () => {
  const [loggedSteps, setLoggedSteps] = useState<number>(0);
  let [isOpen, setIsOpen] = useState(false);
  const { token } = useAuth();
  const [stepsDistribution, setStepsDistribution] = useState<null | any>(null);
  const [chartData, setChartData] = useState<null | any>(null);

  const handleLogSteps = () => {
    // Handle the logic to log steps, e.g., send to the server, update state, etc.
    // For simplicity, I'll just update the state in this example
    setLoggedSteps(loggedSteps + 1000); // Assume the user logged 1000 steps
  };

  const {
    data: stepsData,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["stepsData"],
    queryFn: () => retrieveSteps(token?.user.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // empty use effect
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (isSuccess) {
      const wd: any = { id: "Steps", label: "Steps", data: [] };

      const steps: { label: string; value: number }[] = [];
      Object.keys(stepsData.last_week_distribution).forEach((day) => {
        const totalSteps = stepsData.last_week_distribution[day].total_steps;
        wd.data.push({
          x: stepsData.last_week_distribution[day].date,
          y: totalSteps,
        });
        steps.push({ label: day, value: totalSteps });
      });

      setStepsDistribution(steps);

      setChartData(wd);
    }
  }, [isLoading, isFetching]);

  var today = DAYS_OF_WEEK[(new Date()).getDay()];

  var yesterday = DAYS_OF_WEEK[((new Date()).getDay() === 0) ? 6 : (new Date()).getDay() - 1];

  function resolveGradient(initial: number, final: number) {
    let percentage = ((final - initial) / initial) * 100
    if(isNaN(percentage)){
      percentage = 0;
    }
    if(percentage == Infinity){
      percentage = 100;
    }
    if (percentage < 0) {
      return `-${percentage.toFixed(0)}`
    }
    return `+${percentage.toFixed(0)}`
  }

  if (isError) {
    return <>An Error has occured: {error}</>;
  }
  return (
    <>
      {!isLoading && !isFetching ? (
        <>
          <div className="p-4 mt-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Steps Today
                  </CardTitle>
                  <FootprintsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stepsData.last_week_distribution[today].total_steps}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {`${resolveGradient(stepsData.last_week_distribution[yesterday].total_steps, stepsData.last_week_distribution[today].total_steps)}% from yesterday`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Minutes
                  </CardTitle>
                  <TimerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stepsData.last_week_distribution[today].total_duration.toFixed(0)}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                  {resolveGradient(stepsData.last_week_distribution[yesterday].total_duration, stepsData.last_week_distribution[today].total_duration)}% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Calories Burned
                  </CardTitle>
                  <FlameIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stepsData.last_week_distribution[today].total_calories_burned.toFixed(0)}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                  {resolveGradient(stepsData.last_week_distribution[yesterday].total_calories_burned, stepsData.last_week_distribution[today].total_calories_burned)}% from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Distance Covered
                  </CardTitle>
                  <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stepsData.last_week_distribution[today].total_distance}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                  {resolveGradient(stepsData.last_week_distribution[yesterday].total_distance, stepsData.last_week_distribution[today].total_distance)}% from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex grid-cols-2 gap-4 my-10">
              <div className="flex flex-col p-6 gap-5 rounded shadow">
                <h1 className="text font-semibold mb-4">Steps Overview</h1>
                <div className="flex justify-between items-center">
                  <p className="text-6xl text-blue-600 font-bold">
                    {stepsData.daily.steps}
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-3xl outline-transparent bg-gray-200 rounded-full p-4 hover:bg-blue-200 hover:text-blue-600 duration-150 transition-colors ease-in flex items-center justify-center m-0"
                  >
                    <FaPlus className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex w-full justify-between font-medium text-lg">
                  <span>/6000 Steps</span>
                  <span>
                    Daily avg{" "}
                    {stepsData.weekly_distribution.average.average_steps}
                  </span>
                </div>
                <div className="w-full">
                  <div className="bg-blue-200 h-5 rounded-full relative">
                    <div
                      style={{ width: `calc(5155/6000 * 100%)` }}
                      className="bg-blue-800 h-5 z-10 rounded-full absolute top-0 left-0"
                    ></div>
                  </div>
                </div>

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
                              <input
                                className="rounded font-bold"
                                type="text"
                              />
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

                <div className="flex w-full flex-row gap-6">
                  {stepsDistribution != null && (
                    <>
                      {stepsDistribution.map((dist: any) => (
                        <div
                          key={dist.label}
                          className="flex flex-col items-center gap-2"
                        >
                          <CircularProgress
                            className="h-8 w-8"
                            progress={dist.value}
                          />
                          <p className="font-bold text-lg uppercase text-blue-600">
                            {dist.label}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="w-[48%]">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      This week at a glance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Steps Today
                        </CardTitle>
                        <FootprintsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stepsData.weekly_distribution.distribution['0'].steps}</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resolveGradient(stepsData.weekly_distribution.distribution['1'].steps, stepsData.weekly_distribution.distribution['0'].steps)}% from last week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Minutes
                        </CardTitle>
                        <TimerIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stepsData.weekly_distribution.distribution['0'].duration.toFixed(0)}</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resolveGradient(stepsData.weekly_distribution.distribution['1'].duration, stepsData.weekly_distribution.distribution['0'].duration)}% from last week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Calories Burned
                        </CardTitle>
                        <FlameIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stepsData.weekly_distribution.distribution['0'].calories_burned.toFixed(0)}</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resolveGradient(stepsData.weekly_distribution.distribution['1'].calories_burned, stepsData.weekly_distribution.distribution['0'].calories_burned)}% from yesterday
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          Distance Covered
                        </CardTitle>
                        <MapPinIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stepsData.weekly_distribution.distribution['0'].distance} m</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resolveGradient(stepsData.weekly_distribution.distribution['1'].distance, stepsData.weekly_distribution.distribution['0'].distance)}% from yesterday
                        </p>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Activity Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CurvedlineChart
                  data={[chartData]}
                  className="w-full h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
          {/* <div className="mb-8 mt-8 w-full">
              <h2 className="text-lg font-semibold mb-2">
                Weekly Steps Distribution
              </h2>
              {chartData != null && (
                <>
                  <Bar data={chartData} options={chartOptions} />
                </>
              )}
            </div> */}
        </>
      ) : (
        <div>LOADING</div>
      )}
    </>
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

function FlameIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function FootprintsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4" />
      <path d="M4 13h4" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function TimerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

function CurvedlineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={props.data}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 45,
          legendPosition: "middle",
          format: "%b %d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of steps",
          legendOffset: -45,
          legendPosition: "middle",
        }}
        colors={{ scheme: "paired" }}
        pointSize={5}
        pointColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointBorderWidth={2}
        pointBorderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: "12px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
