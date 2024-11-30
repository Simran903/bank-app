"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axiosClient from "@/constants/axiosClient";
import { useRouter } from "next/navigation";
import axios from "axios";
interface AddBeneficiaries {
  name: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  email: string;
  phone: string;
  accountId: number;
}

function AddBeneficiaries() {
  const [formData, setFormData] = useState<AddBeneficiaries>({
    name: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    email: "",
    phone: "",
    accountId: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "accountId" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/beneficiary/beneficiaries",
        formData,
        { withCredentials: true }
      );
      console.log("Success Response:", response.data);
      setSuccess("Beneficiary added successfully!");

      setTimeout(() => {
        router.push("/dashboard/beneficiaries/all");
      }, 1500);
    } catch (err) {
      let errorMessage = "Failed to add new beneficiary. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else {
        console.error("Unexpected error:", err);
      }

      console.error("Error Response:", err);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10 p-6">
      <div className="shadow-2xl mt-10 p-6 bg-white rounded-md">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">Add New Beneficiary</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { label: "Full Name", type: "text", name: "name", value: formData.name },
              { label: "Account Number", type: "text", name: "accountNumber", value: formData.accountNumber },
              { label: "Bank Name", type: "text", name: "bankName", value: formData.bankName },
              { label: "IFSC Code", type: "text", name: "ifscCode", value: formData.ifscCode },
              { label: "Email", type: "email", name: "email", value: formData.email },
              { label: "Phone", type: "tel", name: "phone", value: formData.phone },
              { label: "Account ID", type: "number", name: "accountId", value: formData.accountId },
            ].map(({ label, ...inputProps }) => (
              <div key={inputProps.name}>
                <label className="block text-xs font-medium">{label}</label>
                <input
                  {...inputProps}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <button
            type="submit"
            className={`w-full mt-4 text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-200 ${
              isSubmitting ? "bg-gray-500" : "bg-gradient-to-br from-black to-neutral-800"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Beneficiary"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBeneficiaries;


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};