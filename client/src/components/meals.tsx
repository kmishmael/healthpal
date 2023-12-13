import { Dispatch, Fragment, SetStateAction } from "react";
import { Button } from "../components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "../components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import SelectSearch from "react-select";
import { API_URL } from "../constats";
import { LuRefreshCcw } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../provider/auth-provider";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const retrieveFoods = async (userId: any) => {
  const response = await axios.get(API_URL + `food/${userId}`);
  return response.data.data;
};

const retrieveMeals = async (userId: any) => {
  const response = await axios.get(API_URL + `meals/${userId}`);
  return response.data.data["this_month"];
};

const addFood = async (userId: any, data: any, refetch: any) => {
  const response = await axios
    .post(API_URL + `food/`, {
      user_id: userId,
      ...data,
    })
    .finally(() => {
      refetch();
    });
  return response.data;
};

const updateFood = async (userId: any, data: any, refetch: any) => {
  const response = await axios
    .put(API_URL + `food/${data.food_id}`, {
      user_id: userId,
      ...data,
    })
    .finally(() => {
      refetch();
    });
  return response.data;
};

const updateMeal = async (userId: any, data: any, refetch: any) => {
  const response = await axios
    .put(API_URL + `meals/${userId}/${data.meal_id}`, {
      user_id: userId,
      ...data,
    })
    .finally(() => {
      refetch();
    });
  return response.data;
};

const addMeal = async (userId: any, data: any, refetch: any) => {
  const response = await axios
    .post(API_URL + `meals/${userId}`, {
      user_id: userId,
      ...data,
    })
    .finally(() => {
      refetch();
    });
  return response.data;
};

const deleteFood = async (foodId: any, refetch: any) => {
  const response = await axios
    .delete(API_URL + `food/${foodId}`)
    .finally(() => {
      refetch();
    });
  return response.data;
};

const deleteMeal = async (mealId: any, userId: any, refetch: any) => {
  const response = await axios
    .delete(API_URL + `meals/${userId}/${mealId}`)
    .finally(() => {
      refetch();
    });
  return response.data;
};

export default function Meals() {
  const [foodFormOpen, setFoodFormOpen] = useState<boolean>(false);
  const [mealFormOpen, setMealFormOpen] = useState<boolean>(false);
  const [currentMeal, setCurrentMeal] = useState<any>(null);
  const [customFoods, setCustomFoods] = useState<any>(null);
  const [foodEdit, setFoodEdit] = useState<{
    name: string;
    calories: number;
    user_id: number | undefined;
    food_id: number;
  } | null>(null);
  const [editFood, setEditFood] = useState<boolean>(false);
  const [editMeal, setEditMeal] = useState<boolean>(false);
  const [mealEdit, setMealEdit] = useState<{
    food_id: number;
    serving_type: string;
    amount: number;
    user_id: number | undefined;
    meal_id: number;
    meal_type: string;
  } | null>(null);
  const { token } = useAuth();

  const {
    data: mealsData,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["mealsData"],
    queryFn: () => retrieveMeals(token?.user.id),
    refetchOnWindowFocus: false,
  });

  const {
    data: foodData,
    error: foodError,
    isLoading: foodIsLoading,
    isFetching: foodIsFetching,
    isError: foodIsError,
    isSuccess: foodIsSuccess,
    refetch: foodRefetch,
  } = useQuery({
    queryKey: ["foodData"],
    queryFn: () => retrieveFoods(token?.user.id),
    refetchOnWindowFocus: false,
  });

  const now = new Date();
  const today = `${now.getUTCFullYear()}-${
    (now.getUTCMonth() + 1) % 13
  }-${now.getUTCDate()}`;

  useEffect(() => {
    // empty use effect
  }, []);

  useEffect(() => {
    if (isLoading || isFetching || foodIsLoading || foodIsFetching) return;
    if (isSuccess && foodIsSuccess) {
      setCurrentMeal(mealsData[today]);
      setCustomFoods([...foodData]);
    }
  }, [isLoading, isFetching, foodIsLoading, foodIsFetching]);

  if (isError || foodIsError) {
    return <>An Error has occured: {error || foodError}</>;
  }

  function refetchWrapper() {
    refetch();
    foodRefetch();
  }

  return (
    <div className="flex p-2 flex-col w-full min-h-screen">
      <div className="h-8 flex justify-end">
        <button
          onClick={() => refetch()}
          className="border rounded px-4 py-2 mr-4 hover:bg-blue-100 transition-colors ease-in duration-200 text-blue-600"
        >
          <LuRefreshCcw className="h-4 w-4" />
        </button>
      </div>

      {!isLoading &&
      !isFetching &&
      !isRefetching &&
      currentMeal != null &&
      !foodIsLoading &&
      !foodIsFetching ? (
        <>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    kcal
                  </p>
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
                  <CardTitle className="text-sm font-medium">
                    Add Meal
                  </CardTitle>
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
                            <div
                              key={c.id}
                              className="flex justify-between p-2 first:border-t border-b items-center"
                            >
                              <div className="">
                                <div>
                                  <p className="font-semibold">{c.food_name}</p>
                                </div>
                                <div>
                                  <p className="text-sm">{c.calories} kcal</p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="outline-transparent p-2 rounded-full hover:bg-slate-100">
                                    <BsThreeDotsVertical />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-24 p-2 bg-white">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setMealEdit({
                                        food_id: c.food_id,
                                        serving_type: c.serving_type,
                                        amount: c.amount,
                                        user_id: token?.user.id,
                                        meal_id: c.id,
                                        meal_type: key,
                                      });
                                      setEditMeal(true);
                                    }}
                                    className="rounded flex gap-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                                  >
                                    <FaEdit></FaEdit>
                                    Edit
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() =>
                                      deleteMeal(c.id, token?.user.id, refetch)
                                    }
                                    className="rounded flex gap-2 hover:bg-blue-100 hover:text-blue-600 cursor-pointer"
                                  >
                                    <RiDeleteBinLine />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
                    <TableBody
                      className={`${
                        customFoods.length == 0 ? "relative h-28" : ""
                      }`}
                    >
                      {customFoods.length == 0 && (
                        <>
                          <div className="h-28 flex items-center absolute top-0 left-0 w-full">
                            <div className="w-full flex justify-center flex-col items-center text-center">
                              <p>You have not added any foods yet.</p>
                              <button
                                onClick={() => setFoodFormOpen(true)}
                                className="w-fit items-center rounded-full px-3 py-1.5 my-4 font-medium text-white bg-blue-500"
                              >
                                <div className="flex gap-1 items-center">
                                  <IoAdd className="w-5 h-5 font-bold" /> Food
                                </div>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {customFoods.length > 0 &&
                        customFoods.map((c: any) => (
                          <TableRow>
                            <TableCell className="font-medium">
                              {c.name}
                            </TableCell>
                            <TableCell>{c.calories}</TableCell>
                            <TableCell className="flex gap-3">
                              <Button
                                onClick={() => {
                                  setFoodEdit({
                                    name: c.name,
                                    calories: c.calories,
                                    user_id: c.user_id,
                                    food_id: c.id,
                                  });
                                  setEditFood(true);
                                }}
                                className="text-xs px-3 w-14 py-1.5 border rounded"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => deleteFood(c.id, foodRefetch)}
                                className="text-xs px-3 w-14 py-1.5 border rounded"
                              >
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

            <AddCustomMeal
              isOpen={mealFormOpen}
              setIsOpen={setMealFormOpen}
              options={customFoods.map((f: any) => {
                return { value: f.id, label: f.name };
              })}
              refetch={refetchWrapper}
            />
            <AddCustomFood
              refetch={refetchWrapper}
              isOpen={foodFormOpen}
              setIsOpen={setFoodFormOpen}
            />
            {/*
            name: string;
            calories: number;
            user_id: number | undefined;
            food_id: number;*/}

            <EditCustomFood
              refetch={refetchWrapper}
              isOpen={editFood}
              setIsOpen={setEditFood}
              inputData={foodEdit}
            />

            <EditCustomMeal
              refetch={refetchWrapper}
              isOpen={editMeal}
              setIsOpen={setEditMeal}
              options={customFoods.map((f: any) => {
                return { value: f.id, label: f.name };
              })}
              inputData={mealEdit}
            />
          </main>
        </>
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
}

function AddCustomMeal({
  isOpen,
  setIsOpen,
  options,
  refetch,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  options: any;
  refetch: any;
}) {
  const [type, setType] = useState<string>("");
  const [serving, setServing] = useState<string>("");
  const [food, setFood] = useState<any>("");

  const { register, handleSubmit } = useForm();
  const { token } = useAuth();

  function handleForm(data: any) {
    try {
      //setIsOpen(false);
      let amount = parseInt(data.amount);
      if (isNaN(amount)) {
        amount = 1;
      }
      const d = {
        type: type,
        serving_type: serving,
        food_id: food.value,
        amount: amount,
        user_id: token?.user.id,
      };
      addMeal(token?.user.id, d, refetch);
      setIsOpen(false);
    } catch {}
  }
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
                      <form onSubmit={handleSubmit(handleForm)}>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Select Food</Label>
                            <SelectSearch
                              onChange={(e: any) => setFood(e)}
                              className="select"
                              options={options}
                            />
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Type of Meal</Label>
                            <Select onValueChange={(e) => setType(e)}>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent
                                className="bg-white"
                                position="popper"
                              >
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="BREAKFAST"
                                >
                                  Breakfast
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="LUNCH"
                                >
                                  Lunch
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="DINNER"
                                >
                                  Dinner
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="MORNING_SNACK"
                                >
                                  Morning snack
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="AFTERNOON_SNACK"
                                >
                                  Afternoon snack
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="EVENING_SNACK"
                                >
                                  Evening snack
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Type of serving</Label>
                            <Select onValueChange={(e) => setServing(e)}>
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent
                                className="bg-white"
                                position="popper"
                              >
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="SERVING"
                                >
                                  Serving
                                </SelectItem>
                                <SelectItem
                                  className="hover:bg-blue-100 rounded hover:text-blue-600"
                                  value="CALORIES"
                                >
                                  Amount of calories
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Amount</Label>
                            <Input
                              id="amount"
                              placeholder="Amount based on serving type"
                              {...register("amount", {
                                required: "Amount is required.",
                              })}
                            />
                          </div>

                          <div className="text-xs text-blue-600 underline">
                            <p>Advanced fields</p>
                          </div>
                        </div>
                        <div className="flex mt-6 justify-between">
                          <Button
                            onClick={() => setIsOpen(false)}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                            variant="outline"
                            type="submit"
                          >
                            Create
                          </Button>
                        </div>
                      </form>
                    </CardContent>
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
  refetch,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch: any;
}) {
  const { register, handleSubmit } = useForm();
  const { token } = useAuth();

  function handleForm(data: any) {
    try {
      //setIsOpen(false);
      let calories = parseInt(data.calories);
      if (isNaN(calories)) {
        calories = 1;
      }
      const d = {
        name: data.name,
        calories: calories,
        user_id: token?.user.id,
      };
      addFood(token?.user.id, d, refetch);
      setIsOpen(false);
    } catch {}
  }

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
                      <form onSubmit={handleSubmit(handleForm)}>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              {...register("name", {
                                required: "Name is required.",
                              })}
                              placeholder="Name of food"
                            />
                          </div>

                          <div className="flex flex-col gap-2 space-y-1.5">
                            <Label htmlFor="name">Calories</Label>
                            <Input
                              {...register("calories", {
                                required: "Calories is required.",
                              })}
                              id="name"
                              placeholder="Number of calories"
                            />
                          </div>

                          <div className="text-xs text-blue-600 underline">
                            <p>Advanced fields</p>
                          </div>
                        </div>
                        <div className="flex mt-6 justify-between">
                          <Button
                            onClick={() => setIsOpen(false)}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                            variant="outline"
                            type="submit"
                          >
                            Create
                          </Button>
                        </div>
                      </form>
                    </CardContent>
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

function EditCustomFood({
  isOpen,
  setIsOpen,
  refetch,
  inputData,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch: any;
  inputData: {
    name: string;
    calories: number;
    user_id: number | undefined;
    food_id: number;
  } | null;
}) {
  const { register, handleSubmit } = useForm();

  function handleForm(data: any) {
    try {
      let calories = parseInt(data.calories);
      if (isNaN(calories)) {
        calories = 1;
      }
      const d = {
        name: data.name,
        calories: calories,
        user_id: inputData?.user_id,
        food_id: inputData?.food_id,
      };
      updateFood(data.user_id, d, refetch);
      setIsOpen(false);
    } catch {}
  }

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
                      <CardTitle>Update Food</CardTitle>
                      <CardDescription>update your custom food</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {inputData && (
                        <>
                          <form onSubmit={handleSubmit(handleForm)}>
                            <div className="grid w-full items-center gap-4">
                              <div className="flex flex-col gap-2 space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  defaultValue={inputData.name}
                                  {...register("name", {
                                    required: "Name is required.",
                                  })}
                                  placeholder="Name of food"
                                />
                              </div>

                              <div className="flex flex-col gap-2 space-y-1.5">
                                <Label htmlFor="name">Calories</Label>
                                <Input
                                  defaultValue={inputData.calories}
                                  {...register("calories", {
                                    required: "Calories is required.",
                                  })}
                                  id="name"
                                  placeholder="Number of calories"
                                />
                              </div>

                              <div className="text-xs text-blue-600 underline">
                                <p>Advanced fields</p>
                              </div>
                            </div>
                            <div className="flex mt-6 justify-between">
                              <Button
                                onClick={() => setIsOpen(false)}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              <Button
                                className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                                variant="outline"
                                type="submit"
                              >
                                Update
                              </Button>
                            </div>
                          </form>
                        </>
                      )}
                    </CardContent>
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

function EditCustomMeal({
  isOpen,
  setIsOpen,
  options,
  refetch,
  inputData,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  options: any;
  refetch: any;
  inputData: {
    food_id: number;
    serving_type: string;
    amount: number;
    user_id: number | undefined;
    meal_id: number;
    meal_type: string;
  } | null;
}) {
  const [type, setType] = useState<string>(inputData?.meal_type as string);
  const [serving, setServing] = useState<string>(
    inputData?.serving_type as string
  );
  const [food, setFood] = useState<any>({
    value: inputData?.food_id,
    label: options.filter((c: any) => c.value == inputData?.food_id)[0].label,
  });

  const { register, handleSubmit } = useForm();
  const { token } = useAuth();

  function handleForm(data: any) {
    try {
      //setIsOpen(false);
      let amount = parseInt(data.amount);
      if (isNaN(amount)) {
        amount = 1;
      }
      const d = {
        type: type,
        serving_type: serving,
        food_id: food.value,
        amount: amount,
        user_id: token?.user.id,
        meal_id: inputData?.meal_id,
      };
      updateMeal(token?.user.id, d, refetch);
      setIsOpen(false);
    } catch {}
  }
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
                      <CardTitle>Edit Meal</CardTitle>
                      <CardDescription>edit custom meal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {inputData && (
                        <form onSubmit={handleSubmit(handleForm)}>
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col gap-2 space-y-1.5">
                              <Label htmlFor="name">Select Food</Label>
                              <SelectSearch
                                onChange={(e: any) => setFood(e)}
                                defaultValue={food}
                                className="select"
                                options={options}
                              />
                            </div>
                            <div className="flex flex-col gap-2 space-y-1.5">
                              <Label htmlFor="name">Type of Meal</Label>
                              <Select
                                defaultValue={inputData.meal_type}
                                onValueChange={(e) => setType(e)}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent
                                  className="bg-white"
                                  position="popper"
                                >
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="BREAKFAST"
                                  >
                                    Breakfast
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="LUNCH"
                                  >
                                    Lunch
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="DINNER"
                                  >
                                    Dinner
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="MORNING_SNACK"
                                  >
                                    Morning snack
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="AFTERNOON_SNACK"
                                  >
                                    Afternoon snack
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="EVENING_SNACK"
                                  >
                                    Evening snack
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-2 space-y-1.5">
                              <Label htmlFor="name">
                                Type of serving - {inputData.serving_type} ={" "}
                                {serving}
                              </Label>
                              <Select
                                defaultValue={inputData.serving_type}
                                onValueChange={(e) => setServing(e)}
                              >
                                <SelectTrigger id="framework">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent
                                  className="bg-white"
                                  position="popper"
                                >
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="SERVING"
                                  >
                                    Serving
                                  </SelectItem>
                                  <SelectItem
                                    className="hover:bg-blue-100 rounded hover:text-blue-600"
                                    value="CALORIES"
                                  >
                                    Amount of calories
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex flex-col gap-2 space-y-1.5">
                              <Label htmlFor="name">Amount</Label>
                              <Input
                                id="amount"
                                defaultValue={inputData.amount}
                                placeholder="Amount based on serving type"
                                {...register("amount", {
                                  required: "Amount is required.",
                                })}
                              />
                            </div>

                            <div className="text-xs text-blue-600 underline">
                              <p>Advanced fields</p>
                            </div>
                          </div>
                          <div className="flex mt-6 justify-between">
                            <Button
                              onClick={() => setIsOpen(false)}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600 duration-150 ease-in transition-colors"
                              variant="outline"
                              type="submit"
                            >
                              Create
                            </Button>
                          </div>
                        </form>
                      )}
                    </CardContent>
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
