"use client";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useAuth } from "../provider/auth-provider";

export default function PopOver({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const { setToken } = useAuth();

  async function signOut() {
    setToken(null);
  }

  return (
    <div className="w-full max-w-sm px-4 flex items-center">
      <Popover className="relative">
        {({ open }: any) => (
          <>
            <Popover.Button className={className}>
              {children}
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-blue-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 w-48">
                <div className="overflow-hidden border rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative  gap-8 bg-white p-2 sm:py-2 sm:px-4">
                    <ul className="w-full flex flex-col">
                      <a
                        href=""
                        className="p-2 hover:text-blue-600 hover:bg-blue-100 rounded transition-all ease-in duration-100"
                      >
                        Your Ratings
                      </a>
                      <a
                        href=""
                        className="p-2 hover:text-blue-600 hover:bg-blue-100 rounded transition-all ease-in duration-100"
                      >
                        Profile
                      </a>

                      <button
                        onClick={() => signOut()}
                        className="p-2 mt-2 text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-500 rounded transition-all ease-in duration-100"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
