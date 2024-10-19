import React from 'react';

interface Transaction {
  id: string;
  name: string;
  email: string;
  amount: number;
  timestamp: string; // ISO date string
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps): React.ReactElement {

  // const recentTransactions = transactions
  //   .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  //   .slice(0, 5);

  const recentTransactions = [];
    

  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className={`ml-auto font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
      {recentTransactions.length === 0 && (
        <p className="text-sm text-muted-foreground">No recent transactions.</p>
      )}
    </div>
  );
}