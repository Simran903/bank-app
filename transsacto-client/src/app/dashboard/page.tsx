"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Wallet, History, TrendingUp, Shield, Bell, Settings, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { getAccountBalance, getRecentTransactions } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface AccountBalance {
  available: number;
  pending: number;
  total: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const { data: balance, isLoading: isLoadingBalance } = useQuery<AccountBalance>({
    queryKey: ["accountBalance"],
    queryFn: getAccountBalance,
  });

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ["recentTransactions"],
    queryFn: getRecentTransactions,
  });

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isLoadingBalance || isLoadingTransactions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... rest of your existing JSX ... */}
    </div>
  );
} 