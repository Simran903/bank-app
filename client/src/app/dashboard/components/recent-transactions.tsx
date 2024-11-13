import React, { useEffect, useState } from "react";
import axiosClient from "@/constants/axiosClient";
import { baseUrl } from "@/constants";

interface Transaction {
  id: string;
  createdAt: string;
  description: string;
  amount: number;
  status: string;
  timestamp: string;
}

export function RecentTransactions(): React.ReactElement {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient.get(`${baseUrl}/transfer/all`, {
          withCredentials: true,
        });
        const allTransactions = response?.data?.data?.allTransfers;

        const recentTransactions = allTransactions
          .sort((a: Transaction, b: Transaction) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5);

        setTransactions(recentTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading transactions...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white text-sm">
        <thead>
          <tr className="bg-zinc-900 text-left">
            <th className="px-4 py-4">ID</th>
            <th className="px-4 py-4">Amount</th>
            <th className="px-4 py-4">Date/Time</th>
            <th className="px-4 py-4">Remarks</th>
            <th className="px-4 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-600">
              <td className="px-4 py-4">{transaction.id}</td>
              <td className="px-4 py-4">₹{transaction.amount.toFixed(2)}</td>
              <td className="px-4 py-4">
                {new Date(transaction.timestamp).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.status}</td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-muted-foreground">
                No recent transactions.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
