import React from "react";
import { Heading } from "./Heading";

export const ContactUs = () => {
  return (
    <div className="bg-white h-screen">
      <div className="">
        <Heading text="Get In Touch" />
      </div>
      <div className="bg-[#0a2351] h-2/3 w-2/6 float-right rounded-tl-2xl rounded-bl-2xl">
        <form
          action=""
          className="max-w-md mx-auto p-6 rounded-lg mt-24"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-200 font-semibold text-xs mb-2"
            >
              Enter your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-200 font-semibold text-xs mb-2"
            >
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="mssg"
              className="block text-gray-200 font-semibold text-xs mb-2"
            >
              Enter your message
            </label>
            <textarea
              name="mssg"
              id="mssg"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};
