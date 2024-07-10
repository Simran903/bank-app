import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

const Signin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Type your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-sm text-gray-600">Or Sign up using</span>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
            <FaFacebookF />
          </button>
          <button className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full">
            <FaTwitter />
          </button>
          <button className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full">
            <FaGoogle />
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
            SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
