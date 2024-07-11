import React from "react";
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center" style={{
      backgroundImage: `url('./signin/account-bg.png')`,
      height: "90vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-[#11212D]">Sign in</h2>
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
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-xs font-bold text-gray-600 hover:text-[#11212D]"
            >
              Forgot password?
            </a>
          </div>
          <div className="m-5">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#11212D] rounded-md hover:bg-opacity-90 outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <p className="text-xs mr-1 text-gray-600">Don't have an account?</p>
          <a
            className="text-sm text-gray-800 font-bold cursor-pointer"
            onClick={handleSignupClick}
          >
            SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
