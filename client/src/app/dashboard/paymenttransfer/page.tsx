"use client";
import React, { useState, FormEvent } from "react";
import { baseUrl } from "@/constants";
import axiosClient from "@/constants/axiosClient";

const TransferMoney: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [toUsername, setToUsername] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosClient.post(
        `${baseUrl}/transfer/transfer`,
        {
          amount: Number(amount),
          toUsername,
          description,
        },
        { withCredentials: true }
      );

      setMessage("Transfer successful!");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      setMessage(error.response?.data?.message || "Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="max-w-lg w-full p-10 bg-black shadow-lg rounded-lg text-white">
        <h2 className="text-xl font-semibold mb-2">Transfer Money</h2>
        <p className="text-gray-400 mb-6">Initiate a money transfer in one-click.</p>
        
        <form onSubmit={handleTransfer} className="space-y-4">
          
          <div>
            <label className="block text-gray-400">Amount</label>
            <input
              type="string"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter amount"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400">Recipient Username</label>
            <input
              type="text"
              value={toUsername}
              onChange={(e) => setToUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Username of recipient"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Add a note"
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => {
                setAmount("");
                setToUsername("");
                setDescription("");
                setMessage("");
              }}
              className="w-24 bg-zinc-900 text-gray-300 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="w-24 bg-red-700 text-white py-2 rounded-md hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Transfer"}
            </button>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </div>
  );
};

export default TransferMoney;