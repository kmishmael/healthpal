import { Suspense } from "react";
import { useAuth } from "../provider/auth-provider";
import PopOver from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Link } from "react-router-dom";

type Menu = {
  name: string;
  path: string;
};

export function getNameInitials(name: string | undefined, email: string) {
  if (!name) {
    return email[0].toLocaleUpperCase();
  }
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
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="w-8 h-8 stroke-black dark:stroke-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.2887 43.1603L5.57735 35L10.2887 26.8397H19.7113L24.4227 35L19.7113 43.1603H10.2887Z" />
              <path d="M28.2887 33.1603L23.5774 25L28.2887 16.8397H37.7113L42.4227 25L37.7113 33.1603H28.2887Z" />
              <path d="M10.2887 22.1603L5.57735 14L10.2887 5.83974H19.7113L24.4227 14L19.7113 22.1603H10.2887Z" />
            </svg>

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
