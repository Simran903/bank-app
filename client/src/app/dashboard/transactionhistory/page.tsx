"use client";

import React, { useEffect, useState } from "react";
import axiosClient from "@/constants/axiosClient";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/transfer/all`,
          { withCredentials: true }
        );
        const fetchedTransactions = response?.data?.data?.allTransfers || [];
        setTransactions(fetchedTransactions);
      } catch (err) {
        console.error("Error fetching transaction history:", err);
        setError("Failed to fetch transaction history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-black-500 border-dashed animate-spin"></div>
        <p className="ml-4 text-gray-400">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  return (
    <div className="mx-4 sm:mx-6 lg:mx-10 p-4 bg-black text-white shadow-lg rounded-lg mt-10 overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-400">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-semibold text-sm sm:text-base">ID</th>
                <th className="p-2 text-left font-semibold text-sm sm:text-base">Amount</th>
                <th className="p-2 text-left font-semibold text-sm sm:text-base">Date/Time</th>
                <th className="p-2 text-left font-semibold text-sm sm:text-base">Remarks</th>
                <th className="p-2 text-left font-semibold text-sm sm:text-base">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const date = new Date(transaction.createdAt);
                const formattedDate = isNaN(date.getTime())
                  ? "Invalid Date"
                  : date.toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });
                return (
                  <tr key={transaction.id} className="border-b last:border-none">
                    <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.id}</td>
                    <td className="p-2 text-xs sm:text-sm md:text-base">₹{transaction.amount}</td>
                    <td className="p-2 text-xs sm:text-sm md:text-base">{formattedDate}</td>
                    <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.description}</td>
                    <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
