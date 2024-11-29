"use client";
import React, { useEffect, useState } from "react";
import axiosClient from "@/constants/axiosClient"; // Assuming you have this set up

interface Transaction {
  id: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
}

function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/transfer/all`, {
          withCredentials: true,
        });
        setTransactions(response?.data?.data?.allTransfers);
        // console.log(response?.data?.data?.allTransfers);
      } catch (err) {
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

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div
      className="mx-4 sm:mx-6 lg:mx-10 p-4 bg-black text-white shadow-lg rounded-lg mt-10 overflow-x-auto border-[3px] border-transparent bg-clip-padding"
      style={{
        borderImage: "linear-gradient(45deg, #d4af37, #ffd700, #e5e4e2) 1",
      }}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b last:border-none">
                  <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.id}</td>
                  <td className="p-2 text-xs sm:text-sm md:text-base">₹{transaction.amount}</td>
                  <td className="p-2 text-xs sm:text-sm md:text-base">
                    {new Date(transaction.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.description}</td>
                  <td className="p-2 text-xs sm:text-sm md:text-base">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;