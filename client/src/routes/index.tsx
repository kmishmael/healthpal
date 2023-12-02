import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import SignUp from "../components/signup";
import Login from "../components/login";
import Header from "../components/header";
import Footer from "../components/footer";


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
          path: "/dashboard",
          element: <Dashboard {...mockData} />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />
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
