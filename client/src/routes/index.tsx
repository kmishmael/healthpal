import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import SignUp from "../components/signup";
import Login from "../components/login";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import Steps from "../pages/steps";
import Dashboard2 from "../pages/dashboard2";
import MealsPage from "../pages/meals";
import ExercisesPage from "../pages/exercises";
import WaterPage from "../pages/water";

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
  // const { token } = useAuth();

  // const routesForPublic = [
  //   {
  //     path: "/service",
  //     element: <div>Service Page</div>,
  //   },
  //   {
  //     path: "/about-us",
  //     element: <div>About Us</div>,
  //   },
  // ];

  // Define routes accessible only to authenticated users
  // const routesForAuthenticatedOnly = [
  //   {
  //     path: "/",
  //     element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //     children: [
  //       {
  //         path: "",
  //         element: <div>User Home Page</div>,
  //       },
  //       {
  //         path: "/profile",
  //         element: <div>User Profile</div>,
  //       },
  //       // {
  //       //   path: "/logout",
  //       //   element: <Logout />,
  //       // },
  //     ],
  //   },
  // ];

  // Define routes accessible only to non-authenticated users
  // const routesForNotAuthenticatedOnly = [
  //     {
  //       path: "/",
  //       element: <div>Home Page</div>,
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //   ];

  // Combine and conditionally include routes based on authentication status
  // const router = createBrowserRouter([
  //   ...routesForPublic,
  //   ...(!token ? routesForNotAuthenticatedOnly : []),
  //   ...routesForAuthenticatedOnly,
  // ]);

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
          element: <WithSideBarLayout />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard {...mockData} />,
            },
            {
              path: "/dashboard2",
              element: <Dashboard2 {...mockData} />,
            },
            {
              path: "/steps",
              element: <Steps totalSteps={12000} weeklySteps={[4000, 6000, 8000, 5000, 7000, 9000, 10000]} />,
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
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

/*
export const router = createBrowserRouter([
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
    ],
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
*/
