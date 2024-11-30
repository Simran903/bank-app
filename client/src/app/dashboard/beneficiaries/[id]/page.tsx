"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosClient from "@/constants/axiosClient";
import { AxiosError, isAxiosError } from "axios";

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

const UpdateBeneficiary: React.FC = () => {
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();
  const { id } = useParams();

  const id_use = typeof id === "string" ? id.split("%")[1]?.split("D")[1] : undefined;

  useEffect(() => {
    const fetchBeneficiary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/beneficiary/beneficiaries/${id_use}`, {
          withCredentials: true,
        });
        setBeneficiary(response?.data?.data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch beneficiary details.");
        } else {
          setError("An unexpected error occurred while fetching beneficiary details.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id_use) fetchBeneficiary();
  }, [id_use]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBeneficiary((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdate = async () => {
    if (!beneficiary) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await axiosClient.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/beneficiary/beneficiaries/${id_use}`,
        beneficiary,
        { withCredentials: true }
      );
      router.push("/dashboard/beneficiaries/all");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to update beneficiary. Please try again.");
      } else {
        setError("An unexpected error occurred while updating the beneficiary.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-8 h-8 border-4 border-black-500 border-dashed animate-spin md:w-12 md:h-12"></div>
        <p className="ml-2 md:ml-4 text-gray-400">Loading beneficiary details...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-2xl w-full mx-auto mt-10 p-6 rounded-lg">
  <div className="shadow-2xl p-6 bg-white rounded-md">
    <h2 className="text-4xl font-bold text-black mb-6 text-center">Update Beneficiary</h2>

    {beneficiary && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div className="space-y-4">
          {[
            { label: "Name", type: "text", name: "name", value: beneficiary.name },
            { label: "Account Number", type: "text", name: "accountNumber", value: beneficiary.accountNumber },
            { label: "Bank Name", type: "text", name: "bankName", value: beneficiary.bankName },
            { label: "IFSC Code", type: "text", name: "ifscCode", value: beneficiary.ifscCode },
            { label: "Email", type: "email", name: "email", value: beneficiary.email },
            { label: "Phone", type: "tel", name: "phone", value: beneficiary.phone },
            { label: "Account ID", type: "number", name: "accountId", value: beneficiary.accountId },
          ].map(({ label, ...inputProps }) => (
            <div key={inputProps.name}>
              <label className="block text-xs font-medium">{label}</label>
              <input
                {...inputProps}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`w-full mt-4 text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-200 ${
            isSubmitting ? "bg-gray-500" : "bg-gradient-to-br from-black to-neutral-800"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Beneficiary"}
        </button>
      </form>
    )}
  </div>
</div>

  );
};

export default UpdateBeneficiary;