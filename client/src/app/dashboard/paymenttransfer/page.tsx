"use client";
import React, { useState, FormEvent } from "react";
import axiosClient from "@/constants/axiosClient";
import { useRouter } from "next/navigation";

const TransferMoney: React.FC = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [toUsername, setToUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axiosClient.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transfer/transfer`,
        {
          amount: Number(amount),
          toUsername,
          description,
        },
        { withCredentials: true }
      );
      setMessage({ text: "Transfer successful!", type: "success" });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      setMessage({
        text: error.response?.data?.message || "Transfer failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAmount("");
    setToUsername("");
    setDescription("");
    setMessage(null);
    router.push("/dashboard/beneficiaries/all");
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-10 p-6 rounded-lg">
      <h2 className="text-4xl font-bold text-black mb-6 text-center">Transfer Money</h2>
      <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">
        Initiate a money transfer in one click.
      </p>

      <form
        onSubmit={handleTransfer}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-medium">Recipient Username</label>
          <input
            type="text"
            value={toUsername}
            onChange={(e) => setToUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="w-24 py-2 text-white font-medium rounded-md bg-red-500 hover:bg-red-600 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`w-24 py-2 text-white font-medium rounded-md ${loading ? "bg-gray-500" : "bg-gradient-to-br from-black to-neutral-800"}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Transfer"}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default TransferMoney;