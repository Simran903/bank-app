import React from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center" style={{
      backgroundImage: `url('./signin/account-bg.png')`,
      height: "90vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-[#11212D]">Sign up</h2>
        <form className="space-y-6 mt-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 mt-1 text-sm border-b-2 border-[#11212D] outline-none"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 text-sm border-b-2 border-[#11212D] outline-none"
              placeholder="Type your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 text-sm border-b-2 border-[#11212D] outline-none"
              placeholder="Type your password"
            />
          </div>
          <div className="m-5 pt-5">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#11212D] rounded-md hover:bg-opacity-90 outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <span className="text-sm text-gray-600">Or Sign up using</span>
        </div>
        <div className="flex items-center justify-center mt-2">
          <button
            type="button"
            className="text-white bg-[#11212D] font-medium rounded-lg text-sm outline-none px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Google
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <p className="text-xs mr-1 text-gray-600">Already have an account?</p>
          <a
            className="tex0t-sm text-gray-800 font-bold cursor-pointer"
            onClick={handleSigninClick}
          >
            SIGN IN
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
