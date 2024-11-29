"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import axiosClient from "@/constants/axiosClient";
import { Menu, MenuItem, MenuButton } from "@headlessui/react";

interface Beneficiary {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  email: string;
  phone: string;
  accountId: number;
}

function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/beneficiary/beneficiaries`, {
          withCredentials: true,
        });
        setBeneficiaries(response?.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Check if error is an instance of AxiosError
          console.error("Error fetching beneficiaries:", error.response);
          setError(error.response?.data?.message || "Failed to fetch beneficiaries. Please try again.");
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleDelete = async (beneficiaryId: number) => {
    setError(null);
    setSuccess(null);
    try {
      await axiosClient.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/beneficiary/beneficiaries/${beneficiaryId}`, {
        withCredentials: true,
      });
      setBeneficiaries((prev) => prev.filter((b) => b.id !== beneficiaryId));
      setSuccess("Beneficiary deleted successfully!");
      setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error deleting beneficiary:", error.response);
        setError(error.response?.data?.message || "Failed to delete beneficiary. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUpdateRedirect = (beneficiaryId: number) => {
    router.push(`/dashboard/beneficiaries/id=${beneficiaryId}`);
  };

  const handleAddBeneficiaryRedirect = () => {
    router.push("/dashboard/beneficiaries/add");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-black-500 border-dashed animate-spin md:w-12 md:h-12"></div>
        <p className="ml-2 md:ml-4 text-gray-400">Loading beneficiaries...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl lg:max-w-6xl w-full mx-auto mt-6 md:mt-10 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 space-y-4 md:space-y-0">
        <h2 className="vast-shadow-regular font-extrabold text-3xl md:text-5xl text-black text-center md:text-left">
          My Beneficiaries
        </h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 text-sm md:text-base"
          onClick={handleAddBeneficiaryRedirect}
        >
          Add New Beneficiary
        </button>

      </div>

      {error && <p className="text-red-600 text-center px-4">{error}</p>}
      {success && <p className="text-green-600 text-center px-4">{success}</p>}

      {beneficiaries.length === 0 ? (
        <p className="text-gray-400 text-center">No beneficiaries found.</p>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {beneficiaries.map((beneficiary) => (
            <div
              key={beneficiary.id}
              className="p-4 sm:p-6 bg-neutral-900 rounded-lg sm:rounded-xl shadow-lg border-[3px] border-transparent bg-clip-padding text-gray-300 relative"
              style={{
                borderImage: "linear-gradient(45deg, #d4af37, #ffd700, #e5e4e2) 1",
              }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">
                {beneficiary.name}
              </h3>
              <div className="grid gap-1 sm:gap-2">
                <p>
                  <span className="font-medium text-gray-400">Account Number:</span> {beneficiary.accountNumber}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Bank Name:</span> {beneficiary.bankName}
                </p>
                <p>
                  <span className="font-medium text-gray-400">IFSC Code:</span> {beneficiary.ifscCode}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Email:</span> {beneficiary.email}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Phone:</span> {beneficiary.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-400">Account ID:</span> {beneficiary.accountId}
                </p>
              </div>

              {/* Three-dot options menu */}
              <Menu as="div" className="absolute top-4 right-4">
                <MenuButton className="text-gray-400 hover:text-white focus:outline-none">
                  •••
                </MenuButton>
                <div className="relative">
                  <Menu.Items className="absolute right-0 mt-2 w-32 bg-neutral-800 border border-gray-600 rounded-md shadow-lg overflow-hidden">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-gray-700" : ""
                            } block w-full px-4 py-2 text-sm text-gray-300`}
                          onClick={() => handleUpdateRedirect(beneficiary.id)}
                        >
                          Update
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          className={`${active ? "bg-red-600" : ""
                            } block w-full px-4 py-2 text-sm text-gray-300`}
                          onClick={() => handleDelete(beneficiary.id)}
                        >
                          Delete
                        </button>
                      )}
                    </MenuItem>
                  </Menu.Items>
                </div>
              </Menu>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BeneficiaryList;