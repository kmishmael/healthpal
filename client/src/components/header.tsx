import { Suspense } from "react";
import { useAuth } from "../provider/auth-provider";
import PopOver from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Link } from "react-router-dom";

type Menu = {
  name: string;
  path: string;
};

export function getNameInitials(name: string | undefined, email: string | undefined) {
  if (!name && email) {
    return email[0].toLocaleUpperCase();
  }
  name = "Ku"
  const ls = name.split(" ");
  let initials = "";
  for (let i = 0; i < 2; i++) {
    if (i < ls.length) {
      initials += ls[i][0];
    }
  }
  return initials.toLocaleUpperCase();
}

export default function Header() {
  const { token } = useAuth();

  const menu: Menu[] = [
    { name: "Food", path: "#" },
    { name: "Exercises", path: "#" },
    { name: "Meals", path: "#" },
    { name: "Steps", path: "#" },
    { name: "Goals", path: "#" },
    { name: "Contact", path: "#" },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense>{/* <MobileMenu menu={menu} /> */}</Suspense>
      </div>
      <div className="flex w-full items-center justify-between mx-2">
        <div className="flex w-full">
          <Link
            to="/"
            className="mr-2 flex gap-4 w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <HeartPulseIcon className="h-6 w-6 text-red-500" />

            <div className="flex-none text-sm font-medium uppercase md:hidden lg:block">
              HEALTHPAL
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu, _: number) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-neutral-800 underline-offset-4 hover:text-black "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="">
          {token && token.user ? (
            <div className="flex gap-4 items-center">
              <PopOver
                className={`inline-flex mx-auto items-center outline-transparent`}
              >
                <div className="border-4 rounded-full border-transparent hover:border-gray-200 transition-[border] duration-200 ease-in">
                  <Avatar>
                    <AvatarImage src={``} />
                    <AvatarFallback>
                      {getNameInitials(token.user.name, token.user.email)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </PopOver>
              <Link to="dashboard">
                <button className="outline-transparent h-10 rounded-lg text-white hover:text-white px-3 duration-200 ease transition-color py-1.5 bg-blue-600 hover:bg-blue-800">
                  Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="login">
                <button className="outline-transparent h-10 border w-24 rounded-lg text-black hover:text-white px-3 duration-200 ease transition-color py-1.5 hover:bg-blue-600">
                  Sign in
                </button>
              </Link>
              <Link to="register">
                <button className="outline-transparent h-10 w-24 rounded-lg text-white hover:text-white px-3 duration-200 ease transition-color py-1.5 bg-blue-600 hover:bg-blue-800">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function HeartPulseIcon(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}
