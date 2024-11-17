// RecentTransactions.tsx
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
    <div>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="transaction-item">
          <p>Amount: ₹{transaction.amount}</p>
          <p>Description: {transaction.description}</p>
          <p>Date: {new Date(transaction.timestamp).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
