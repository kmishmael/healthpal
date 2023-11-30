import { Suspense } from "react";


type Menu = {
  name: string;
  path: string;
};
export default function Header() {
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
        <Suspense>
          {/* <MobileMenu menu={menu} /> */}
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-2/3">
          <a
            href="/"
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

            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              HEALTHPAL
            </div>
          </a>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu, index: number) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-neutral-800 underline-offset-4 hover:text-black "
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense>
            {/* <Search /> */}
          </Suspense>
        </div>
        <div className="flex justify-end md:w-[10%]">
          <Suspense>
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
