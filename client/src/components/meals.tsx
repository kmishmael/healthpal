import { Dispatch, Fragment, SetStateAction } from "react";
import { Button } from "../components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import  SelectSearch from "react-select";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Meals() {
  const [foodFormOpen, setFoodFormOpen] = useState<boolean>(false);
  const [mealFormOpen, setMealFormOpen] = useState<boolean>(false);

  const options = [
    { value: "apple", label: "Apple" },
    { value: "pineapple", label: "Pineapple" },
    { value: "watermelon", label: "Watermelon" },
  ]

  const mealsData: any = {
    status: "success",
    message: "Meals retrieved successfully.",
    data: {
      user_id: 1,
      start_date: "2023-12-01",
      end_date: "2023-12-11",
      today: {
        BREAKFAST: [],
        LUNCH: [],
        DINNER: [],
        MORNING_SNACK: [],
        AFTERNOON_SNACK: [],
        EVENING_SNACK: [],
      },
      this_month: {
        "2023-12-11": {
          distribution: {
            BREAKFAST: {
              data: [
                {
                  id: 1,
                  food_id: 1,
                  amount: 1,
                  serving_type: "SERVING",
                  calories: 100,
                  date: "2023-12-10",
                  food_name: "Coffee",
                },
                {
                  id: 2,
                  food_id: 2,
                  amount: 1,
                  serving_type: "SERVING",
                  calories: 80,
                  date: "2023-12-10",
                  food_name: "Banana",
                },
              ],
              total_calories: 180,
            },
            LUNCH: {
              data: [
                {
                  id: 3,
                  food_id: 2,
                  amount: 1,
                  serving_type: "SERVING",
                  calories: 80,
                  date: "2023-12-10",
                  food_name: "Banana",
                },
              ],
              total_calories: 80,
            },
            DINNER: {
              data: [
                {
                  id: 4,
                  food_id: 2,
                  amount: 1,
                  serving_type: "SERVING",
                  calories: 80,
                  date: "2023-12-10",
                  food_name: "Banana",
                },
              ],
              total_calories: 80,
            },
            MORNING_SNACK: {
              data: [],
              total_calories: 0,
            },
            AFTERNOON_SNACK: {
              data: [],
              total_calories: 0,
            },
            EVENING_SNACK: {
              data: [],
              total_calories: 0,
            },
          },
          total_calories: 340,
        },
      },
    },
  };

  const customFoods = {
    status: "success",
    message: "Food retrieved successfully.",
    data: [
      {
        id: 1,
        name: "Coffee",
        type: "CUSTOM",
        user_id: 1,
        calories: 100,
        total_carbohydrates: null,
        total_fat: null,
        protein: null,
        saturated_fat: null,
        trans_fat: null,
        cholesterol: null,
        sodium: null,
        potassium: null,
        dietary_fibre: null,
        sugars: null,
        vitamin_a: null,
        vitamin_c: null,
        calcium: null,
        iron: null,
      },
      {
        id: 2,
        name: "Banana",
        type: "CUSTOM",
        user_id: 1,
        calories: 80,
        total_carbohydrates: null,
        total_fat: null,
        protein: null,
        saturated_fat: null,
        trans_fat: null,
        cholesterol: null,
        sodium: null,
        potassium: null,
        dietary_fibre: null,
        sugars: null,
        vitamin_a: null,
        vitamin_c: null,
        calcium: null,
        iron: null,
      },
    ],
  };

  const now = new Date();
  const today = `${now.getFullYear()}-${
    (now.getMonth() + 1) % 13
  }-${now.getDate()}`;

  console.log(mealsData["data"]["this_month"]);

  const currentMeal = mealsData["data"]["this_month"][today];
  console.log(currentMeal);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Calories
              </CardTitle>
              <EggIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMeal.total_calories}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">kcal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Time</CardTitle>
              <SandwichIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMeal.total_calories}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                minutes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Add Meal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center items-center text-center">
                <button
                  onClick={() => setMealFormOpen(true)}
                  className="w-fit items-center rounded-full px-3 py-1.5 my-4 font-medium text-white bg-blue-500"
                >
                  <div className="flex gap-1 items-center">
                    <IoAdd className="w-5 h-5 font-bold" /> Meal
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Add Custom Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-center items-center text-center">
                <button
                  onClick={() => setFoodFormOpen(true)}
                  className="w-fit items-center rounded-full px-3 py-1.5 my-4 font-medium text-white bg-blue-500"
                >
                  <div className="flex gap-1 items-center">
                    <IoAdd className="w-5 h-5 font-bold" /> Food
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Today's Meals
              </CardTitle>
              <Button className="text-xs">Add Food</Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.keys(currentMeal.distribution).map((key: any) => (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium flex justify-between">
                        <div>{key}</div>
                        <div>
                          {currentMeal.distribution[key].total_calories}{" "}
                          <span className="text-gray-700">kcal</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-80 overflow-auto">
                      {currentMeal.distribution[key].data.map((c: any) => (
                        <>
                          <div className="p-2 first:border-t border-b">
                            <div>
                              <p className="font-semibold">{c.food_name}</p>
                            </div>
                            <div>
                              <p className="text-sm">{c.calories} kcal</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Your Custom Foods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Food</TableHead>
                    <TableHead className="w-[100px]">Calories</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customFoods.data.map((c: any) => (
                    <TableRow>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell>{c.calories}</TableCell>
                      <TableCell className="flex gap-3">
                        <Button className="text-xs px-3 w-14 py-1.5 border rounded">
                          Edit
                        </Button>
                        <Button className="text-xs px-3 w-14 py-1.5 border rounded">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <AddCustomMeal isOpen={mealFormOpen} setIsOpen={setMealFormOpen} options={options} />
        <AddCustomFood isOpen={foodFormOpen} setIsOpen={setFoodFormOpen} />
      </main>
    </div>
  );
}

function AddCustomMeal({
  isOpen,
  setIsOpen,
  options,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  options: any;
}) {
  return (
    <>
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
                  ></Dialog.Title>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Create New Meal</CardTitle>
                      <CardDescription>
                        Add a custom meal to your menu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Select Food</Label>
                            <SelectSearch className='select' options={options} />
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Type of Meal</Label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-white" position="popper">
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="BREAKFAST">Breakfast</SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="LUNCH">
                                  Lunch
                                </SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="DINNER">Dinner</SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="MORNING_SNACK">Morning snack</SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="AFTERNOON_SNACK">Afternoon snack</SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="EVENING_SNACK">Evening snack</SelectItem>

                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Type of serving</Label>
                            <Select>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent className="bg-white" position="popper">
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="SERVING">Serving</SelectItem>
                                <SelectItem className="hover:bg-blue-100 rounded hover:text-blue-600" value="CALORIES">
                                  Amount of calories
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Amount</Label>
                            <Input id="name" placeholder="Amount based on serving type" />
                          </div>

                          <div className="text-xs text-blue-600 underline">
                            <p>Advanced fields</p>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                        variant="outline"
                      >
                        Create
                      </Button>
                    </CardFooter>
                  </Card>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function AddCustomFood({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
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
                  ></Dialog.Title>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Create New Food</CardTitle>
                      <CardDescription>
                        Add a custom food to your menu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of food" />
                          </div>

                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Calories</Label>
                            <Input id="name" placeholder="Number of calories" />
                          </div>

                          <div className="text-xs text-blue-600 underline">
                            <p>Advanced fields</p>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                        variant="outline"
                      >
                        Create
                      </Button>
                    </CardFooter>
                  </Card>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function EggIcon(props: any) {
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
      <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
    </svg>
  );
}

function SandwichIcon(props: any) {
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
      <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
      <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
      <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
      <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
    </svg>
  );
}
