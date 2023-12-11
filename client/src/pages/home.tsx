import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export default function Home(): JSX.Element {
  return (
    <>
      <div
        style={{
          borderBottomLeftRadius: "100rem 5rem",
          borderBottomRightRadius: "100rem 5rem",
        }}
        className="h-[90vh] w-full bg-[#05963d] border relative flex sm:px-20 py-28"
      >
        <div className="">
          <h1 className="text-6xl w-4/5 font-extrabold mb-4 leading-[78px] text-white">
            Empower Your Health Journey with{" "}
            <span className="text-red-800 relative inline-block">
              HealthPal
              <span className="absolute w-full -bottom-4 left-1/2 transform -translate-x-1/2">
                <svg
                  className="fill-yellow-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1418 125"
                  fill="#000"
                >
                  <path d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68ZM925.4 23.77c37.64 1.4 153.99 10.85 196.64 14.94 45.95 5.51 91.89 11.03 137.76 17.19 24.25 4.77 74.13 11.21 101.72 18.14-11.87-1.15-23.77-1.97-35.65-3.06-133.46-15.9-266.8-33.02-400.47-47.21Z"></path>
                </svg>
              </span>
            </span>
          </h1>
          <p className="text-white mb-8 text-lg pt-4">
            Your all-in-one health tracker for exercises, meals, water intake,
            weight, and more!
          </p>
          <div className="flex justify-center space-x-4 w-3/5 mt-10">
            <button className="bg-white text-yellow-600 px-6 py-3 rounded-full hover:bg-gray-50">
              Get Started
            </button>
          </div>
        </div>
        <img
          className="object-fit absolute right-12 top-12 w-96"
          src="fruit-salad.png"
          alt=""
        />
        <img
          className="object-fit absolute left-4 top-2 w-64"
          src="grape-vine.png"
          alt=""
        />
      </div>
      {/* <LandingPage /> */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt="Fitness tracking"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Health Tracking
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Make Your Health a Priority
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
                  With HealthPal, you can easily keep track of your health and
                  fitness goals. Monitor your progress over time and stay
                  motivated with our intuitive, easy-to-use app.
                </p>
              </div>
              <div className="flex gap-2 min-w-[400px] flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-500/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                  to="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join Our Community
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
              Become a part of our supportive and inspiring community. Share
              your journey, learn from others, and stay motivated!
            </p>
          </div>
          <div className="grid w-full grid-cols-2 lg:grid-cols-5 items-center justify-center gap-8 lg:gap-12">
            <img
              className="aspect-[1/1] overflow-hidden rounded-full object-cover object-center"
              src="/placeholder.svg?height=70&width=70"
            />
            <img
              className="aspect-[1/1] overflow-hidden rounded-full object-cover object-center"
              src="/placeholder.svg?height=70&width=70"
            />
            <img
              className="aspect-[1/1] overflow-hidden rounded-full object-cover object-center"
              src="/placeholder.svg?height=70&width=70"
            />
            <img
              className="aspect-[1/1] overflow-hidden rounded-full object-cover object-center"
              src="/placeholder.svg?height=70&width=70"
            />
            <img
              className="aspect-[1/1] overflow-hidden rounded-full object-cover object-center"
              src="/placeholder.svg?height=70&width=70"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <img className="w-20 h-20" src="/placeholder.svg?height=100&width=100" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold text-gray-800">John Doe</h3>
                  <p className="mt-2 text-gray-500">
                    "HealthPal helped me improve my health and fitness. It's easy to use and has excellent features."
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <img className="w-20 h-20" src="/placeholder.svg?height=100&width=100" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold text-gray-800">Jane Smith</h3>
                  <p className="mt-2 text-gray-500">
                    "The best health tracking app I've ever used. It's been a game changer for my fitness journey."
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <img className="w-20 h-20" src="/placeholder.svg?height=100&width=100" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold text-gray-800">Alice Johnson</h3>
                  <p className="mt-2 text-gray-500">
                    "I love the meal tracking feature. It's made maintaining a healthy diet so much easier."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
    </>
  );
}
