import { HiChevronRight } from "react-icons/hi";
import { BiLogoFacebook, BiLogoYoutube, BiLogoLinkedin } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

/**
 * Footer component
 *
 * server component
 * @returns JSX.Element
 */
export default function Footer() {
  return (
    <>
      <footer className="bg-blue-50 text-black py-8">
        <div className="container mx-auto grid grid-cols-2 gap-6 md:grid-cols-4 md:px-8">
          <section className="max-w-sm">
            <h1 className="font-semibold text-lg mb-4">Healthpal</h1>
            <nav className="flex flex-col gap-3 pt-2">
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Dashboard
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Food
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Exercise
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Meal
              </a>
            </nav>
          </section>

          <section className="max-w-sm">
            <h1 className="font-semibold text-lg mb-4">Useful Links</h1>
            <nav className="flex flex-col gap-3 pt-2">
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Who we are
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Join our team
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Contact Us
              </a>
              <a
                href={"/privacy-policy"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Privacy policy
              </a>
              <a
                href={"/terms-of-service"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Terms and Service
              </a>
            </nav>
          </section>

          <section className="max-w-sm">
            <h1 className="font-semibold text-lg mb-4">Our Social Networks</h1>
            <nav className="flex flex-row gap-3 pt-2">
              <a
                href={"/"}
                className="flex justify-center items-center h-7 w-7 rounded-full bg-blue-500 hover:bg-blue-700 ease-in transition-colors"
              >
                <BiLogoFacebook className="h-5 w-5 text-white" />
              </a>

              <a
                href={"/"}
                className="flex justify-center items-center h-7 w-7 rounded-full bg-blue-500 hover:bg-blue-700 ease-in transition-colors"
              >
                <FaXTwitter className="h-4 w-4 text-white" />
              </a>

              <a
                href={"/"}
                className="flex justify-center items-center h-7 w-7 rounded-full bg-blue-500 hover:bg-blue-700 ease-in transition-colors"
              >
                <BiLogoYoutube className="h-4 w-4 text-white" />
              </a>

              <a
                href={"/"}
                className="flex justify-center items-center h-7 w-7 rounded-full bg-blue-500 hover:bg-blue-700 ease-in transition-colors"
              >
                <BiLogoLinkedin className="h-5 w-5 text-white" />
              </a>
            </nav>
          </section>

          <section className="max-w-sm">
            <h1 className="font-semibold text-lg mb-4">Get Started</h1>
            <nav className="flex flex-col gap-3 pt-2">
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Sign up
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Sign in
              </a>
              <a
                href={"/"}
                className="flex gap-1 text-sm items-center hover:text-blue-600 ease-in transition-colors"
              >
                <HiChevronRight className="h-5 w-5 text-blue-600" />
                Explore
              </a>
            </nav>
          </section>
          {/*           
          <section className="max-w-sm">
            <h1 className="font-semibold text-lg mb-4">Get Started</h1>
            <div className="flex flex-col gap-3">
              <p className="text-neutral-900">Contact us for any inquiries:</p>
              <a
                href="mailto:contact@tutormeter.io"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                contact@tutormeter.io
              </a>
            </div>
          </section> */}
        </div>

        <div className="container mx-auto text-sm mt-6 text-center">
          <p className="text-neutral-900">
            &copy; {new Date().getFullYear()} Tutormeter.io. All Rights Reserved
          </p>
        </div>
      </footer>
    </>
  );
}
