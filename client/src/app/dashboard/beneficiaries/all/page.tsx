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
    // Navigate to the update page with the beneficiary ID as a query parameter
    router.push(`/beneficiaries/update?id=${beneficiaryId}`);
  };

  if (loading) return <p>Loading beneficiaries...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl w-full mx-auto mt-10 p-6 rounded-lg">
      <h2 className="vast-shadow-regular font-extrabold text-5xl text-black mb-8 text-center">
        Beneficiaries List
      </h2>
      
      {beneficiaries.length === 0 ? (
        <p className="text-gray-400 text-center">No beneficiaries found.</p>
      ) : (
        <ul className="space-y-6">
          {beneficiaries.map((beneficiary) => (
            <li
              key={beneficiary.id}
              className="p-10 bg-neutral-900 rounded-xl shadow-xl border border-amber-500 inria-sans-regular relative"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{beneficiary.name}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-gray-300">
                <p><span className="font-medium text-gray-400">Account Number:</span> {beneficiary.accountNumber}</p>
                <p><span className="font-medium text-gray-400">Bank Name:</span> {beneficiary.bankName}</p>
                <p><span className="font-medium text-gray-400">IFSC Code:</span> {beneficiary.ifscCode}</p>
                <p><span className="font-medium text-gray-400">Email:</span> {beneficiary.email}</p>
                <p><span className="font-medium text-gray-400">Phone:</span> {beneficiary.phone}</p>
                <p><span className="font-medium text-gray-400">Account ID:</span> {beneficiary.accountId}</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BeneficiaryList;