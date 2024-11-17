import React from "react";

interface Transfer {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
  status: string;
}

interface RecentTransactionsProps {
  transactions: Transfer[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-white text-sm">
        <thead>
          <tr className="bg-zinc-900 text-left">
            <th className="px-4 py-4">ID</th>
            <th className="px-4 py-4">Amount</th>
            <th className="px-4 py-4">Date/Time</th>
            <th className="px-4 py-4">Description</th>
            <th className="px-4 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-800">
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
              <td className="px-4 py-4">{transaction.description}</td>
              <td className="px-4 py-4">{transaction.status}</td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No recent transactions.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
