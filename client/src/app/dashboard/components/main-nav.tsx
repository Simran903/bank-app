"use client";

import Link from "next/link";
import { useState } from "react";

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative bg-blue-600 p-4 text-white">
      {/* Hamburger Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Brand or Logo */}
        <h1 className="text-lg font-bold">Transsacto</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-6 mt-4">
        <Link
          href="/dashboard"
          className="text-md font-bold transition-colors hover:text-gray-300"
        >
          Overview
        </Link>
        <Link
          href="/dashboard/beneficiaries/all"
          className="text-md font-bold transition-colors hover:text-gray-300"
        >
          My Banks
        </Link>
        <Link
          href="/dashboard/transactionhistory"
          className="text-md font-bold transition-colors hover:text-gray-300"
        >
          Transaction History
        </Link>
        <Link
          href="/dashboard/paymenttransfer"
          className="text-md font-bold transition-colors hover:text-gray-300"
        >
          Payment Transfer
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-4 right-4 bg-white text-black shadow-lg rounded-md p-4 lg:hidden">
          <Link
            href="/dashboard"
            className="block text-md font-bold transition-colors hover:text-gray-700 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/beneficiaries/all"
            className="block text-md font-bold transition-colors hover:text-gray-700 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            My Banks
          </Link>
          <Link
            href="/dashboard/transactionhistory"
            className="block text-md font-bold transition-colors hover:text-gray-700 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Transaction History
          </Link>
          <Link
            href="/dashboard/paymenttransfer"
            className="block text-md font-bold transition-colors hover:text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Payment Transfer
          </Link>
        </div>
      )}
    </nav>
  );
}
