"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RecentTransactions } from "./components/recent-transactions";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useEffect, useState } from "react";
import { baseUrl } from "@/constants";
import axiosClient from "@/constants/axiosClient";
import MonthlyExpenseChart from "./components/overview";

interface UserData {
  balance: number;
  recentTransfers: Transfer[];
  amountSent: number;
  amountReceived: string;
}

interface Transfer {
  [key: string]: any;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [recentTransfers, setRecentTransfers] = useState<Transfer[]>([]);
  const [amountSent, setAmountSent] = useState<number>(0);
  const [amountReceived, setAmountReceived] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          balanceRes,
          transferRes,
          amountSentRes,
          amountReceivedRes,
        ] = await Promise.all([
          axiosClient.post(baseUrl + "/user/get-balance", {}),
          axiosClient.get(`${baseUrl}/transfer/all`, {
            withCredentials: true,
          }),
          axiosClient.get(`${baseUrl}/transfer/sent`, {
            withCredentials: true,
          }),
          axiosClient.get(`${baseUrl}/transfer/received`, {
            withCredentials: true,
          }),
        ]);

        // console.log(transferRes);

        setBalance(balanceRes?.data?.data?.totalBalance);
        setRecentTransfers(transferRes?.data?.data?.allTransfers);

        const sentTransfers = amountSentRes?.data?.data?.sentTransfers || [];
        const totalAmountSent = sentTransfers.reduce(
          (acc: number, transfer: { amount: number }) => {
            return acc + (transfer.amount || 0);
          },
          0
        );
        setAmountSent(totalAmountSent);

        const receivedTransfers = amountReceivedRes?.data?.data?.receivedTransfers || [];
        const totalAmountReceived = receivedTransfers.reduce(
          (acc: number, transfer: { amount: number }) => {
            return acc + (transfer.amount || 0);
          },
          0
        );
        setAmountReceived(totalAmountReceived);

        setUserData({
          balance: balanceRes?.data?.data?.totalBalance,
          recentTransfers: transferRes?.data?.data?.allTransfers,
          amountSent: totalAmountSent,
          amountReceived: totalAmountReceived,
        });
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!userData) {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-black-500 border-dashed animate-spin"></div>
          <p className="ml-4 text-gray-400">Loading dashboard...</p>
        </div>
      );
    }
  }

  return (
    <div className="h-screen inria-sans-regular">
      <div className="flex flex-col p-4 md:p-8">
        <div className="flex-1 space-y-4 mt-10 md:mt-14">
          <h1 className="text-3xl font-extrabold md:text-5xl">Hi there,</h1>
          <div className="space-y-4 md:space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Here&apos;s your account overview
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {/* Balance Card */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Balance
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={balance} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Transactions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter amount={recentTransfers.length} />
                    </div>
                  </CardContent>
                </Card>

                {/* Amount Received Card */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Amount Received
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={amountReceived} />
                    </div>
                  </CardContent>
                </Card>

                {/* Amount Sent Card */}
                <Card>
                  <CardHeader className="flex justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Amount Sent
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="flex text-2xl font-bold">
                      ₹<AnimatedCounter amount={amountSent} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overview and Recent Transactions Section */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-7">
                {/* Overview Card */}
                <Card className="col-span-1 sm:col-span-7 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <MonthlyExpenseChart />
                  </CardContent>
                </Card>

                {/* Recent Transactions Card */}
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
