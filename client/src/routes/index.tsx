import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import SignUp from "../components/signup";
import Login from "../components/login";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import Steps from "../pages/steps";
import MealsPage from "../pages/meals";
import ExercisesPage from "../pages/exercises";
import WaterPage from "../pages/water";
import { ProtectedRoute } from "./protected-route";
import ProfilePage from "../pages/profile";

function RootLayout() {
  return <Outlet />;
}

function HomeLayout() {
  return (
    <>
      <Header />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function WithSideBarLayout() {
  return (
    <>
      <SideBar />
      <div className="ml-[250px]">
        <Outlet />
      </div>
    </>
  );
}

export const Routes = () => {
  const mockData = {
    calories: 1500,
    steps: 8000,
    waterIntake: 2000,
    sleepTime: 7,
    exercises: 30,
    foods: 3,
    meals: 2,
  };

  const router = createBrowserRouter([
    {
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            { path: "/profile", element: <ProfilePage /> },
            {
              path: "/",
              element: <WithSideBarLayout />,
              children: [
                {
                  path: "/dashboard",
                  element: <Dashboard {...mockData} />,
                },
                {
                  path: "/steps",
                  element: (
                    <Steps
                      totalSteps={12000}
                      weeklySteps={[4000, 6000, 8000, 5000, 7000, 9000, 10000]}
                    />
                  ),
                },
                {
                  path: "/meals",
                  element: <MealsPage />,
                },
                {
                  path: "/water",
                  element: <WaterPage />,
                },
                {
                  path: "/exercises",
                  element: <ExercisesPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
