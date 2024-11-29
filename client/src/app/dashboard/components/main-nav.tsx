"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axiosClient from "@/constants/axiosClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <svg width="23" height="25" viewBox="0 0 23 23" color="white">
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

const sidebarVariants = {
  open: {
    clipPath: `circle(150% at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
    width: "100vw",
    height: "100vh",
  },
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


export function MainNav() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await axiosClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signout`, {});
      localStorage.clear();
      router.push("/");
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axiosClient.post<{ data: { success: boolean; message?: string } }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/update-password`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response?.data?.data?.success) {
        alert("Password updated successfully.");
        setIsModalOpen(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(response?.data?.data?.message || "Failed to update password.");
      }
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="relative">
      <nav className="relative p-4 flex items-center justify-between">
        <MenuToggle
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isOpen={isSidebarOpen}
        />
      </nav>

      <motion.div
        className="fixed top-0 left-0 h-full bg-black z-40 flex flex-col sidebar"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        style={{ overflow: "hidden" }}
      >

        <div className="p-10 space-y-4 mt-16 flex-1">
          <Link
            href="/dashboard"
            className="block text-lg font-semibold text-white hover:text-gray-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/beneficiaries/all"
            className="block text-lg font-semibold text-white hover:text-gray-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            My Beneficiaries
          </Link>
          <Link
            href="/dashboard/transactionhistory"
            className="block text-lg font-semibold text-white hover:text-gray-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            Transaction History
          </Link>
          <Link
            href="/dashboard/paymenttransfer"
            className="block text-lg font-semibold text-white hover:text-gray-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            Payment Transfer
          </Link>
        </div>

        <div className="p-10 mt-auto space-y-4">
          <button
            className="block w-full text-lg bg-blue-700 px-10 py-2 font-semibold text-white hover:bg-blue-800"
            onClick={() => setIsModalOpen(true)}
          >
            Update Password
          </button>
          <button
            className="block w-full text-lg bg-red-700 px-10 py-2 font-semibold text-white hover:bg-red-800"
            onClick={() => {
              setIsSidebarOpen(false);
              handleLogout();
            }}
          >
            Log Out
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </motion.div>

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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Update Password</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium">Current Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
                onClick={handleUpdatePassword}
              >
                Update
              </Button>

            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}