"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import RecentTransactions from "./components/recent-transactions";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useEffect, useState } from "react";
import axiosClient from "@/constants/axiosClient";
import MonthlyExpenseChart from "./components/overview";

interface UserData {
  balance: number;
  recentTransfers: Transfer[];
  amountSent: number;
  amountReceived: number;
}

interface Transfer {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
  status: string;
}

export default function DashboardPage(): React.ReactElement {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [recentTransfers, setRecentTransfers] = useState<Transfer[]>([]);
  const [amountSent, setAmountSent] = useState<number>(0);
  const [amountReceived, setAmountReceived] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        const [
          balanceRes,
          transferRes,
          amountSentRes,
          amountReceivedRes,
        ] = await Promise.all([
          axiosClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get-balance`, {}),
          axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/transfer/all`, { withCredentials: true }),
          axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/transfer/sent`, { withCredentials: true }),
          axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/transfer/received`, { withCredentials: true }),
        ]);

        // Balance data
        const fetchedBalance = balanceRes?.data?.data?.totalBalance || 0;
        setBalance(fetchedBalance);

        // Recent transfers
        const fetchedTransfers: Transfer[] = transferRes?.data?.data?.allTransfers || [];
        setRecentTransfers(fetchedTransfers);

        // Amount Sent
        const sentTransfers = amountSentRes?.data?.data?.sentTransfers || [];
        const totalAmountSent = sentTransfers.reduce(
          (acc: number, transfer: { amount: number }) => acc + (transfer.amount || 0),
          0
        );
        setAmountSent(totalAmountSent);

        // Amount Received
        const receivedTransfers = amountReceivedRes?.data?.data?.receivedTransfers || [];
        const totalAmountReceived = receivedTransfers.reduce(
          (acc: number, transfer: { amount: number }) => acc + (transfer.amount || 0),
          0
        );
        setAmountReceived(totalAmountReceived);

        // Consolidate user data
        setUserData({
          balance: fetchedBalance,
          recentTransfers: fetchedTransfers,
          amountSent: totalAmountSent,
          amountReceived: totalAmountReceived,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-black-500 border-dashed animate-spin"></div>
        <p className="ml-4 text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-400">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="h-screen inria-sans-regular">
      <div className="flex flex-col p-4 md:p-8">
        <div className="flex-1 space-y-4 mt-8 md:mt-4">
          <h1 className="text-3xl font-extrabold md:text-5xl">Hi there,</h1>
          <div className="space-y-4 md:space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Here&apos;s your account overview
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {/* Card for Balance */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={balance} />
                    </div>
                  </CardContent>
                </Card>

                {/* Card for Total Transactions */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter amount={recentTransfers.length} />
                    </div>
                  </CardContent>
                </Card>

                {/* Card for Amount Received */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Amount Received</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={amountReceived} />
                    </div>
                  </CardContent>
                </Card>

                {/* Card for Amount Sent */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Amount Sent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={amountSent} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-7">
                {/* Overview Chart */}
                <Card className="col-span-1 sm:col-span-7 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <MonthlyExpenseChart />
                  </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="col-span-1 sm:col-span-7 lg:col-span-3">
                  <CardHeader className="mb-5">
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions transactions={recentTransfers} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
