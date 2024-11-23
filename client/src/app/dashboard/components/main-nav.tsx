"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

// Hamburger/Cross Toggle Animation
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => (
  <button onClick={toggle} className="focus:outline-none z-50 relative">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      />
    </svg>
  </button>
);

// Sidebar Animation Variants
const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

// Sidebar Component
export default function MainNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="p-8 flex items-center justify-between">
        {/* Hamburger Menu */}
        <MenuToggle
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isOpen={isSidebarOpen}
        />

        {/* Logo or Brand */}
        <h1 className="text-lg font-bold">Transsacto</h1>
      </nav>

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 w-1/3 h-full bg-white z-40"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
      >
        <div className="p-10 space-y-4 mt-16">
          <button
            className="absolute top-4 right-4 text-xl font-bold"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
          <Link
            href="#"
            className="block text-lg font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/beneficiaries/all"
            className="block text-lg font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            My Banks
          </Link>
          <Link
            href="/dashboard/transactionhistory"
            className="block text-lg font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            Transaction History
          </Link>
          <Link
            href="/dashboard/paymenttransfer"
            className="block text-lg font-semibold text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            Payment Transfer
          </Link>
        </div>
      </motion.div>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
