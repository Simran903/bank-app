"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={cn("flex items-center justify-between lg:justify-start", className)}
      {...props}
    >

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden p-2 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Desktop Menu Links */}
      <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
        <Link href="/dashboard" className="text-md font-bold transition-colors hover:text-gray-500">
          Overview
        </Link>
        <Link href="/dashboard/beneficiaries/all" className="text-md font-bold text-muted-foreground transition-colors hover:text-gray-500">
          My Banks
        </Link>
        <Link href="/dashboard/transactionhistory" className="text-md font-bold text-muted-foreground transition-colors hover:text-gray-500">
          Transaction History
        </Link>
        <Link href="/dashboard/paymenttransfer" className="text-md font-bold text-muted-foreground transition-colors hover:text-gray-500">
          Payment Transfer
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-4 right-4 z-10 bg-white shadow-md rounded-md p-4">
          <Link
            href="/dashboard"
            className="block text-md font-bold transition-colors hover:text-gray-500 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/beneficiaries/all"
            className="block text-md font-bold text-muted-foreground transition-colors hover:text-gray-500 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            My Banks
          </Link>
          <Link
            href="/dashboard/transactionhistory"
            className="block text-md font-bold text-muted-foreground transition-colors hover:text-gray-500 mb-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Transaction History
          </Link>
          <Link
            href="/dashboard/paymenttransfer"
            className="block text-md font-bold text-muted-foreground transition-colors hover:text-gray-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Payment Transfer
          </Link>
        </div>
      )}
    </nav>
  );
}