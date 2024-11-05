"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "./components/date-range-picker";
// import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentTransactions } from "./components/recent-transactions";
// import { UserNav } from "./components/user-nav";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useEffect, useState } from "react";
import { baseUrl } from "@/constants";
import axiosClient from "@/constants/axiosClient";

interface UserData {
  balance: number;
  // accountDetails: AccountDetails;
  recentTransfers: Transfer[];
  amountSent: number;
  amountReceived: number;
}

// interface AccountDetails {
//   [key: string]: any;
// }

interface Transfer {
  [key: string]: any;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
  //   null
  // );
  const [recentTransfers, setRecentTransfers] = useState<Transfer[]>([]);
  const [amountSent, setAmountSent] = useState<number>(0);
  const [amountReceived, setAmountReceived] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          balanceRes,
          // accountRes,
          transferRes,
          amountSentRes,
          amountReceivedRes,
        ] = await Promise.all([
          axiosClient.post(baseUrl + "/user/get-balance", {}),
          // axiosClient.post(baseUrl + "/user/account-details", {}),
          axiosClient.get(baseUrl + "/transfer/all"),
          axiosClient.get(baseUrl + "/transfer/sent"),
          axiosClient.get(baseUrl + "/transfer/received"),
        ]);

        setBalance(balanceRes?.data?.data?.totalBalance);
        // setAccountDetails(accountRes?.data?.data);
        setRecentTransfers(transferRes?.data?.data);
        setAmountSent(amountSentRes?.data?.data);
        setAmountReceived(amountReceivedRes?.data?.data);

        // console.log(amountSentRes);
        // console.log(amountReceivedRes);        

        setUserData({
          balance: balanceRes?.data?.data?.totalBalance,
          // accountDetails: accountRes?.data?.data,
          recentTransfers: transferRes?.data?.data,
          amountSent: amountSentRes?.data?.data,
          amountReceived: amountReceivedRes?.data?.data,
        });

        // console.log(balance);
        // console.log(accountDetails);
        // console.log(recentTransfers);
        // console.log(amountSent);
        // console.log(amountReceived);

      } catch (error) {
        console.log("Error fetching dashboard data:", error);
        setLoading(false)
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
    <div className="h-screen bg-gray-100 inria-sans-regular">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6 mt-14">
          <h1 className="text-5xl font-extrabold">Hi there,</h1>
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight vast-shadow-regular">
              Here&apos;s your account overview
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Balance
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-1 text-2xl font-bold">
                      ₹<AnimatedCounter amount={balance} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Transactions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Amount Received
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex">
                      ₹<AnimatedCounter amount={amountReceived} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Amount Sent
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold flex">
                      ₹<AnimatedCounter amount={amountSent} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
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
