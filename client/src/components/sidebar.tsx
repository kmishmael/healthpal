import { getNameInitials } from "./header";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/auth-provider";

export default function SideBar() {
  const { token } = useAuth()
  return (
    <>
      <div className="w-[250px] shadow-lg fixed h-screen top-0 left-0">
        <div className="h-full">
          <div className="w-full flex flex-col h-[30%] items-center justify-center mt-3">
            <div className="border-4 rounded-full border-transparent hover:border-gray-200 transition-[border] duration-200 ease-in">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/u/66499851`}
                />
                <AvatarFallback>
                  {getNameInitials(token?.user.name, token?.user.email)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="py-2 font-bold text-neutral-600 text-lg uppercase">
              <p>{token?.user.name || token?.user.email}</p>
            </div>

            <div>
              <button className="px-4 py-2 border font-medium rounded-full">
                Profile
              </button>
            </div>
          </div>

          <div className="py-6 mt-2 flex flex-col h-[70%]">
            <ul className="flex flex-col gap-1 px-4">
              <Link
                to="dashboard"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Dashboard</span>
                </li>
              </Link>
              <Link
                to="steps"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Steps</span>
                </li>
              </Link>
              <Link
                to="meals"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Meals</span>
                </li>
              </Link>
              <Link
                to="water"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Water</span>
                </li>
              </Link>
              <Link
                to="exercises"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Exercises</span>
                </li>
              </Link>
            </ul>
            <ul className="flex mt-auto flex-col gap-1 px-4">
              <a
                href="#"
                className="rounded-full overflow-hidden px-4 hover:bg-neutral-200 active:bg-neural-200 transition-colors duration-150 ease-in hover:text-blue-600 active:text-blue-600"
              >
                <li className="p-2 flex">
                  <span className="w-full">Logout</span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
