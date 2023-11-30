export default function Footer() {
  return (
    <footer className="bg-black text-neutral-50">
      <div className="lg:max-w-[1152px] py-[40px] px-[24px] sm:py-[56px] sm:px-[32px] lg:px-[64px] flex flex-col gap-[36px] mx-auto">
        <div className="flex flex-col">
          <div className="h-28 flex items-center">
            <p className="text-2xl">HealthPal</p>
          </div>
          <a href="#">
            <div className="h-16 w-fit hover:underline underline-offset-[43px]">
              <p>Visit Help Center</p>
            </div>
          </a>
        </div>
        <div className="flex">
          <div className="flex flex-col w-1/4">
            <div className="my-4">
              <p className="font-medium">Company</p>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    About us
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Our offerings
                  </a>
                </li>
                <li>
                  <a href="#">Newsroom</a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Investors
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    AI
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Gift cards
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-1/4">
            <div className="my-4">
              <p className="font-medium">Products</p>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Ride
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Drive
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Deliver
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Eat
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Uber for Business
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Uber Freight
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-1/4">
            <div className="my-4">
              <p className="font-medium">Global citizenship</p>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Safety
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Diversion and Inclusion
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-1/4">
            <div className="my-4">
              <p className="font-medium">Travel</p>
            </div>
            <div>
              <ul className="flex flex-col gap-4">
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Reserve
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Airports
                  </a>
                </li>
                <li>
                  <a className="hover:text-neutral-400 text-[14px]" href="#">
                    Cities
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ul className="flex">
            <li className="w-28">
              <a
                data-baseweb="button"
                href="https://www.facebook.com/uber"
                aria-label="Visit Uber's Facebook"
                target="_self"
                data-tracking-name="_eec9ad33-2623-400f-8403-f7e01c3c18d4_facebook_cta3"
              >
                <div className="flex transition-[background] duration-200 justify-center items-center w-12 h-12 rounded-lg hover:bg-hover-gray">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <title>facebook</title>
                    <path
                      d="M21.79 1H2.21C1.54 1 1 1.54 1 2.21v19.57c0 .68.54 1.22 1.21 1.22h10.54v-8.51H9.9v-3.33h2.86V8.71c0-2.84 1.74-4.39 4.27-4.39.85 0 1.71.04 2.56.13v2.97h-1.75c-1.38 0-1.65.65-1.65 1.62v2.12h3.3l-.43 3.33h-2.89V23h5.61c.67 0 1.21-.54 1.21-1.21V2.21C23 1.54 22.46 1 21.79 1Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li className="w-28">
              <a
                data-baseweb="button"
                href="https://twitter.com/uber"
                aria-label="Visit Uber's Twitter"
                target="_self"
                data-tracking-name="_eec9ad33-2623-400f-8403-f7e01c3c18d4_twitter_cta31"
              >
                <div className="flex transition-[background] duration-200 justify-center items-center w-12 h-12 rounded-lg hover:bg-hover-gray">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <title>twitter</title>
                    <path
                      d="M23 5.13c-.81.36-1.69.61-2.61.72.94-.56 1.66-1.45 2-2.51-.88.52-1.85.9-2.89 1.1A4.558 4.558 0 0 0 16.18 3a4.543 4.543 0 0 0-4.42 5.58c-3.78-.19-7.13-2-9.37-4.75-.39.67-.62 1.45-.62 2.28 0 1.58.8 2.97 2.02 3.78-.75-.02-1.45-.23-2.06-.57v.06c0 2.2 1.57 4.04 3.65 4.45-.38.12-.78.17-1.19.17-.29 0-.58-.03-.85-.08a4.557 4.557 0 0 0 4.25 3.16 9.112 9.112 0 0 1-5.64 1.95c-.37 0-.73-.02-1.08-.06 2.01 1.29 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93 0-.2 0-.39-.01-.59.86-.65 1.63-1.45 2.24-2.36Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li className="w-28">
              <a
                data-baseweb="button"
                href="https://www.youtube.com/channel/UCgnxoUwDmmyzeigmmcf0hZA"
                aria-label="Visit Uber's Youtube"
                target="_self"
                data-tracking-name="_eec9ad33-2623-400f-8403-f7e01c3c18d4_youtube_cta32"
              >
                <div className="flex transition-[background] duration-200 justify-center items-center w-12 h-12 rounded-lg hover:bg-hover-gray">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <title>youtube</title>
                    <path
                      d="M23 12s0-3.85-.46-5.58c-.25-.95-1-1.7-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46c-.95.25-1.69 1.01-1.94 1.96C1 8.15 1 12 1 12s.04 3.85.5 5.58c.25.95 1 1.7 1.95 1.96 1.71.46 8.59.46 8.59.46s6.88 0 8.6-.46c.95-.25 1.69-1.01 1.94-1.96.46-1.73.42-5.58.42-5.58Zm-13 3.27V8.73L15.5 12 10 15.27Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li className="w-28">
              <a
                data-baseweb="button"
                href="https://www.linkedin.com/company/1815218"
                aria-label="Visit Uber's LinkedIn"
                target="_self"
                data-tracking-name="_eec9ad33-2623-400f-8403-f7e01c3c18d4_linkedin_cta27"
              >
                <div className="flex transition-[background] duration-200 justify-center items-center w-12 h-12 rounded-lg hover:bg-hover-gray">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <title>linkedin</title>
                    <path
                      d="M21.37 1H2.62C1.73 1 1 1.71 1 2.58v18.83c0 .88.73 1.59 1.62 1.59h18.75c.9 0 1.63-.71 1.63-1.59V2.58C23 1.71 22.27 1 21.37 1ZM7.53 19.75H4.26V9.25h3.27v10.5ZM5.89 7.81C4.85 7.81 4 6.96 4 5.92s.84-1.89 1.89-1.89c1.04 0 1.89.85 1.89 1.89.01 1.04-.84 1.89-1.89 1.89Zm13.86 11.94h-3.26v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7v5.19H9.57V9.26h3.13v1.43h.04c.44-.83 1.5-1.7 3.09-1.7 3.3 0 3.91 2.17 3.91 5v5.76h.01Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </a>
            </li>
            <li className="w-28">
              <a
                data-baseweb="button"
                href="https://instagram.com/uber/"
                aria-label="Visit Uber's Instagram"
                target="_self"
                data-tracking-name="_eec9ad33-2623-400f-8403-f7e01c3c18d4_instagram_cta25"
              >
                <div className="flex transition-[background] duration-200 justify-center items-center w-12 h-12 rounded-lg hover:bg-hover-gray">
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                    <title>instagram</title>
                    <g fill="currentColor">
                      <path d="M21.15 2.85C19.05.74 16.23 1 12 1 8.04 1 5 .69 2.85 2.85.74 4.95 1 7.77 1 12c0 3.95-.31 7 1.85 9.15C4.95 23.26 7.77 23 12 23c3.96 0 7 .31 9.15-1.85C23.25 19.05 23 16.23 23 12c0-4.31.24-7.07-1.85-9.15Zm-1.4 16.9c-1.37 1.37-3.18 1.27-7.75 1.27-4.29 0-6.34.15-7.75-1.27-1.44-1.44-1.27-3.51-1.27-7.75 0-4.23-.15-6.33 1.27-7.75C5.66 2.84 7.6 2.98 12 2.98c4.23 0 6.33-.15 7.75 1.27 1.38 1.38 1.27 3.22 1.27 7.75 0 4.24.15 6.34-1.27 7.75Z"></path>
                      <path d="M12 6.35a5.65 5.65 0 1 0 .001 11.301A5.65 5.65 0 0 0 12 6.35Zm0 9.32c-2.02 0-3.67-1.64-3.67-3.67 0-2.03 1.64-3.67 3.67-3.67 2.03 0 3.67 1.64 3.67 3.67 0 2.02-1.65 3.67-3.67 3.67ZM17.87 4.81c-.73 0-1.32.59-1.32 1.32 0 .73.59 1.32 1.32 1.32.73 0 1.32-.59 1.32-1.32 0-.73-.59-1.32-1.32-1.32Z"></path>
                    </g>
                  </svg>
                </div>
              </a>
            </li>
          </ul>
          <ul className="flex">
            <li>
              <button className="bg-transparent border-0 flex items-center gap-2 shadow-none hover:bg-hover-gray px-[12px] py-[10px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <title>Globe</title>
                  <path
                    d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1Zm8 11c0 .7-.1 1.4-.3 2-.6-1.5-1.6-3.1-3-4.7l1.8-1.8c1 1.3 1.5 2.8 1.5 4.5ZM6.5 6.5c1.3 0 3.6.8 6 2.9l-3.2 3.2C7.1 9.8 6.5 7.5 6.5 6.5Zm8.1 5c2.3 2.7 2.9 5 2.9 6-1.3 0-3.6-.8-6-2.9l3.1-3.1Zm1.9-6.1-1.9 1.9c-1.6-1.4-3.2-2.4-4.7-3 .7-.2 1.3-.3 2-.3 1.8 0 3.3.5 4.6 1.4ZM4 12c0-.7.1-1.4.3-2 .6 1.5 1.6 3.1 3 4.7l-1.8 1.8C4.5 15.2 4 13.7 4 12Zm3.5 6.6 1.9-1.9c1.6 1.4 3.2 2.4 4.7 3-.7.2-1.3.3-2 .3-1.8 0-3.3-.5-4.6-1.4Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>English</span>
              </button>
            </li>
            <li>
              <button className="bg-transparent flex gap-2 border-0 shadow-none hover:bg-hover-gray px-[12px] py-[10px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <title>Location marker</title>
                  <path
                    d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4ZM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>Nairobi</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="flex justify-between">
          <p>&copy; 2023 Healthpal Inc.</p>
          <ul className="flex gap-4 text-sm font-[300]">
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Accessibility</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
