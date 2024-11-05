"use client";
import React, { useEffect, useState } from "react";
import axiosClient from "@/constants/axiosClient"; // Assuming you have this set up
import { baseUrl } from "@/constants"; // Adjust this if needed

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
        const response = await axiosClient.get(`${baseUrl}/transfer/all`, {
          withCredentials: true,
        });
        setTransactions(response?.data?.data?.allTransfers);
        console.log(response?.data?.data?.allTransfers);
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
        <div className="w-12 h-12 border-4 border-red-500 border-dashed animate-spin"></div>
        <p className="ml-4 text-gray-400">Loading transactions...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mx-5 p-4 text-white h-[80vh] bg-black shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date/Time</th>
              <th className="p-2">Remarks</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">₹{transaction.amount}</td>
                <td className="p-2">
                  {new Date(transaction.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td className="p-2">{transaction.description}</td>
                <td className="p-2">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;
