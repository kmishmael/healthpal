// Login.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constats";
import { generateStars, shower } from "../lib/meteor";
import { useAuth } from "../provider/auth-provider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
/*
interface LoginProps {
  onSubmit: (formData: LoginFormData) => void;
}
*/

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  //const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    generateStars(); // Generate stars when the component mounts
    setInterval(
      () => {
        shower();
      },
      6000,
      Infinity
    );
  }, []);

  const onSubmit = (_formData: LoginFormData): void => {
    setLoading(true);
    axios
      .post(
        API_URL + "auth/login",
        { email: _formData.email, password: _formData.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          setToken(res.data);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleLogin = (data: any) => {
    setError(null);
    onSubmit(data);
  };

  return (
    <>
      <div className="relative h-screen bg-black z-10 flex justify-center items-center w-full">
        <div id="stars-container" className="stars-container"></div>
        <div className="max-w-md min-w-[384px] mx-auto p-6 bg-white shadow-md rounded-md relative z-10">
          <Link
            to="/"
            className="text-2xl mb-4 uppercase text-blue-600 font-semibold"
          >
            Healthpal
          </Link>

          <div className="w-full text-center p-4">
            <h2 className="text-xl uppercase font-thin">Login</h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="text"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-blue-500 dark:placeholder-gray-400 dark:text-white ${
                  errors.email ? `outline-red-500` : `outline-blue-500`
                }`}
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid.",
                  },
                })}
              />
              {errors.email && (
                <p className={`text-red-600 text-xs`}>
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className={`block mb-1 text-sm font-medium text-gray-900 dark:text-white`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                {...register("password")}
              />
            </div>
            {error && (
              <div>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgotten your Password?
              </a>
            </div>

           
             
              <button
                type="submit"
                className="w-full flex justify-center gap-4 text-lg items-center text-white bg-blue-600 hover:bg-blue-800 transition-all duration-100 ease-in focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                 {`Login to your account`}
                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>


          </form>

          <div className="">
            <div className="w-full text-center text-xs mt-4">
              <span>
                By continuing, you agree to HealthPal's{" "}
                <Link to={"#"} className="font-semibold hover:underline">
                  Terms of Service{" "}
                </Link>{" "}
                and acknowledge that you've read our{" "}
                <Link to={"#"} className="font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </div>

            <div className="font-medium text-gray-500 mt-2 text-xs dark:text-gray-300 text-center">
              Not registered?{" "}
              <Link
                to={`/register`}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
