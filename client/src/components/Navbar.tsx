"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 inset-x-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-3xl font-bold text-gray-800">
            <Link href="/" className="vast-shadow-regular">Transsacto</Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="#home" className="text-zinc-800 font-semibold hover:text-gray-900">
              Home
            </Link>
            <Link href="#features" className="text-zinc-800 font-semibold hover:text-gray-900">
              Features
            </Link>
            <Link href="#accordion" className="text-zinc-800 font-semibold hover:text-gray-900">
              FAQs
            </Link>
            <Link href="/signin" className="text-zinc-800 font-semibold hover:text-gray-900">
              Sign In
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
            >
              <span className="sr-only">Toggle navigation</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="space-y-1 px-4 pt-2 pb-3">
            <Link
              href="#home"
              className="block text-zinc-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="block text-zinc-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Features
            </Link>
            <Link
              href="#accordion"
              className="block text-zinc-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              FAQs
            </Link>
            <Link
              href="/signup"
              className="block text-zinc-800 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
