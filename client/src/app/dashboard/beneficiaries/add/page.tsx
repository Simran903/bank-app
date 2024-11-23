"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/constants";
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "accountId" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post(
        baseUrl + "/beneficiary/beneficiaries",
        formData,
        { withCredentials: true }
      );
      console.log("Success Response:", response.data);
      setSuccess("Beneficiary added successfully!");

      // Redirect after a short delay to allow the user to read the success message
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
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black mt-20">
      <h2 className="font-bold text-xl text-white">
        Add New Beneficiary
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your fullname"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            name="accountNumber"
            placeholder="XXXX XXXX XXXX"
            type="text"
            required
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </LabelInputContainer>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
          <LabelInputContainer>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              placeholder="ABC Bank"
              type="text"
              required
              value={formData.bankName}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              placeholder="ABC000XX"
              type="text"
              required
              value={formData.ifscCode}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="abc.exaample.com"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+91 84XXX 69XXX"
              type="text"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="accountId">Account Id</Label>
          <Input
            id="accountId"
            name="accountId"
            placeholder="25478XXXXX"
            type="text"
            required
            value={formData.accountId}
            onChange={handleChange}
          />
        </LabelInputContainer>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add Beneficiary &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export default AddBeneficiaries;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
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
