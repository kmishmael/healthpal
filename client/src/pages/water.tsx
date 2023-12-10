import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "../components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { LuRefreshCcw } from "react-icons/lu";
import { API_URL } from "../constats";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../provider/auth-provider";
import { IoAdd } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

const logWater = async (userId: any, amount: any, refetch: any) => {
  const response = await axios
    .post(API_URL + `water_intake/${userId}`, {
      amount: amount,
    })
    .finally(() => {
      refetch();
    });
  return response.data;
};

const retrieveWaterLogs = async (userId: any) => {
  const response = await axios.get(API_URL + `water_intake/${userId}`);
  return response.data.data;
};

export default function WaterPage() {
  const { token } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [waterAmount, setWaterAmount] = useState<string | number>(250);
  const [chartData, setChartData] = useState<null | any>(null);

  const {
    data: waterLogData,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["stepsData"],
    queryFn: () => retrieveWaterLogs(token?.user.id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // empty use effect
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (isSuccess) {
      const wd: any = { id: "Steps", label: "Steps", data: [] };

      waterLogData.weekly.distribution.map((day: any) => {
        wd.data.push({
          x: day.day,
          y: day.total_intake,
        });
      });

      setChartData(wd);
    }
  }, [isLoading, isFetching]);

  function resolveGradient(initial: number, final: number) {
    let percentage = ((final - initial) / initial) * 100;
    if (isNaN(percentage)) {
      percentage = 0;
    }
    if (percentage == Infinity) {
      percentage = 100;
    }
    if (percentage < 0) {
      return `${percentage.toFixed(0)}`;
    }
    return `+${percentage.toFixed(0)}`;
  }

  if (isError) {
    return <>An Error has occured: {error}</>;
  }

  function handleForm() {
    try {
      setIsOpen(false);
      let water_amount = parseInt(waterAmount as string);
      if (isNaN(water_amount)) {
        water_amount = 0;
      }
      console.log(water_amount);
      logWater(token?.user.id, water_amount, refetch);
    } catch {}
  }

  return (
    <div className="flex p-2 flex-col w-full">
      <div className="h-8 flex justify-end">
        <button
          onClick={() => refetch()}
          className="border rounded px-4 py-2 mr-4 hover:bg-blue-100 transition-colors ease-in duration-200 text-blue-600"
        >
          <LuRefreshCcw className="h-4 w-4" />
        </button>
      </div>
      {!isLoading && !isFetching && !isRefetching ? (
        <>
          <main className="flex flex-1 flex-col gap-4 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Water Intake Today
                  </CardTitle>
                  <GlassWaterIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {waterLogData.daily.total_intake} ml
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {resolveGradient(
                      waterLogData.prev_day.total_intake,
                      waterLogData.daily.total_intake
                    )}
                    % from yesterday
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Water Intake This Week
                  </CardTitle>
                  <GlassWaterIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {waterLogData.weeks.immediate} ml
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {resolveGradient(
                      waterLogData.weeks.prev_week,
                      waterLogData.weeks.immediate
                    )}
                    % from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Water Intake This Month
                  </CardTitle>
                  <GlassWaterIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {waterLogData.months.immediate} ml
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {resolveGradient(
                      waterLogData.months.prev_month,
                      waterLogData.months.immediate
                    )}
                    % from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Log Water Intake
                  </CardTitle>
                  <LogInIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="w-full flex justify-center items-center text-center">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-fit flex gap-2 items-center rounded-full px-3 py-1.5 my-4 font-medium text-white bg-blue-500"
                    >
                      <IoAdd className="w-5 h-5 font-bold" /> 250 ml
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Water Intakes today
                  </CardTitle>
                  <BookIcon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent className="space-y-3 py-3 h-64 overflow-x-auto">
                  {waterLogData.daily.data.reverse().map((c: any) => (
                    <>
                      <div key={c.timestamp} className="py-2 my-2 first:border-t border-b">
                        <div className="text-sm font-bold">{c.amount} ml</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(c.timestamp)
                            .getHours()
                            .toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                          :
                          {new Date(c.timestamp)
                            .getMinutes()
                            .toLocaleString("en-US", {
                              minimumIntegerDigits: 2,
                              useGrouping: false,
                            })}
                        </p>
                      </div>

                    </>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Water Intake Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    chartData={chartData}
                    className="w-full h-[300px]"
                  />
                </CardContent>
              </Card>
            </div>
          </main>

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
                        Logs Water (ml)
                      </Dialog.Title>
                      <div className="flex mt-2 gap-4">
                        <button
                          onClick={() => {
                            setCustom(false);
                            setWaterAmount(250);
                          }}
                          className={`py-1.5 px-2 border rounded-md border-gray-300 hover:bg-blue-100 text-blue-600 ${
                            !custom && waterAmount === 250
                              ? `bg-blue-600 hover:bg-blue-800 text-white`
                              : ``
                          } `}
                        >
                          250 ml
                        </button>
                        <button
                          onClick={() => {
                            setCustom(false);
                            setWaterAmount(300);
                          }}
                          className={`py-1.5 px-2 border rounded-md border-gray-300 hover:bg-blue-100 text-blue-600 ${
                            !custom && waterAmount === 300
                              ? `bg-blue-600 hover:bg-blue-800 text-white`
                              : ""
                          }`}
                        >
                          300 ml
                        </button>
                        <button
                          onClick={() => {
                            setCustom(false);
                            setWaterAmount(500);
                          }}
                          className={`py-1.5 px-2 border rounded-md border-gray-300 hover:bg-blue-100 text-blue-600 ${
                            !custom && waterAmount === 500
                              ? `bg-blue-600 hover:bg-blue-800 text-white`
                              : ""
                          }`}
                        >
                          500 ml
                        </button>
                        <button
                          onClick={() => {
                            setCustom(false);
                            setCustom((prev) => !prev);
                          }}
                          className={`py-1.5 px-2 border rounded-md border-gray-300 hover:bg-blue-100 text-blue-600 ${
                            custom
                              ? `bg-blue-600 text-white hover:bg-blue-800`
                              : ``
                          }`}
                        >
                          Custom
                        </button>
                      </div>
                      <div className="mt-2">
                        {custom ? (
                          <input
                            className="rounded mt-4 border border-gray-300 font-bold"
                            type="text"
                            value={waterAmount}
                            onChange={(e) => setWaterAmount(e.target.value)}
                          />
                        ) : (
                          <p className="py-2">{waterAmount}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            handleForm();
                            setIsOpen(false);
                          }}
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
      ) : (
        <>
          <div>LOADING</div>
        </>
      )}
    </div>
  );
}

function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function GlassWaterIcon(props: any) {
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
      <path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z" />
      <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
    </svg>
  );
}

function LineChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[props.chartData]}
        enableCrosshair={false}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
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
          legend: "X",
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Y",
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

function LogInIcon(props: any) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
