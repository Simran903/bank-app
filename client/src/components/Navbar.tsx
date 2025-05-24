"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 bg-transparent z-50 px-4 py-2 mt-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-sm px-4 py-2 border border-white text-white rounded-md font-medium hover:bg-white/10 transition">
            Transsacto
          </span>
        </Link>
        <Link href="/signup">
          <span className="text-sm px-4 py-2 border border-white text-white rounded-md font-medium hover:bg-white/10 transition">
            Open Account
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;