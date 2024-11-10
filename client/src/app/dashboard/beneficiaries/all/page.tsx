"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/constants/axiosClient";
import { baseUrl } from "@/constants";
import { AxiosError } from "axios";
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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`${baseUrl}/beneficiary/beneficiaries`, {
          withCredentials: true,
        });
        setBeneficiaries(response?.data?.data);
        setLoading(false);
      } catch (err: AxiosError) {
        console.error("Error fetching beneficiaries:", err.response);
        setError(err.response?.data?.message || "Failed to fetch beneficiaries. Please try again.");
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleDelete = async (beneficiaryId: number) => {
    try {
      await axiosClient.delete(`${baseUrl}/beneficiary/beneficiaries/${beneficiaryId}`, {
        withCredentials: true,
      });
      setBeneficiaries((prev) => prev.filter((b) => b.id !== beneficiaryId));
    } catch (err: AxiosError) {
      console.error("Error deleting beneficiary:", err.response);
      setError(err.response?.data?.message || "Failed to delete beneficiary. Please try again.");
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
        <div className="w-12 h-12 border-4 border-black-500 border-dashed animate-spin"></div>
        <p className="ml-4 text-gray-400">Loading beneficiaries...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl w-full mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="vast-shadow-regular font-extrabold text-5xl text-black">
          My Beneficiaries
        </h2>
        <button
          className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600"
          onClick={handleAddBeneficiaryRedirect}
        >
          Add New Beneficiary
        </button>
      </div>

      {beneficiaries.length === 0 ? (
        <p className="text-gray-400 text-center">No beneficiaries found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {beneficiaries.map((beneficiary) => (
            <div
              key={beneficiary.id}
              className="p-6 bg-neutral-900 rounded-xl shadow-xl border border-amber-500 inria-sans-regular relative"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {beneficiary.name}
              </h3>
              <div className="grid gap-2 text-gray-300">
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
                          className={`${
                            active ? "bg-gray-700" : ""
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
                          className={`${
                            active ? "bg-red-600" : ""
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
