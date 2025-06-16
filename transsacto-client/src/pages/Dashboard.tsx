import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, History, Settings, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const initialDashboard = {
  balance: 0,
  recentTransfers: [],
  amountSent: 0,
  amountReceived: 0,
  totalTransactions: 0
};

const initialUser = {
  name: "User",
  profilePicture: "",
  balance: 0,
  accountType: "",
  accountId: ""
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [dashboardData, setDashboardData] = useState(initialDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [balanceRes, sentRes, receivedRes, userRes] = await Promise.all([
          axiosClient.post("/user/get-balance", {}),
          axiosClient.get("/transfer/sent"),
          axiosClient.get("/transfer/received"),
          axiosClient.post("/user/account-details")
        ]);

        const fetchedBalance = balanceRes?.data?.data?.totalBalance || 0;

        // Set user data from API response
        const userData = userRes?.data?.data || {};
        setUser({
          name: userData.fullName || "User",
          profilePicture: userData.profilePicture || "",
          balance: fetchedBalance,
          accountType: userData.type || "",
          accountId: userData.accountId || ""
        });

        // Process transfers
        const sentTransfers = (sentRes?.data?.data?.sentTransfers || []).map((transfer, index) => ({
          id: transfer.id || `sent-${index}`,
          amount: Math.abs(transfer.amount || 0),
          description: transfer.description || 'Transfer sent',
          timestamp: transfer.timestamp || transfer.createdAt || new Date().toISOString(),
          status: transfer.status || 'completed',
          recipient: transfer.toAccount?.userId || transfer.toAccountId || 'Unknown',
          type: 'sent'
        }));

        const receivedTransfers = (receivedRes?.data?.data?.receivedTransfers || receivedRes?.data?.data || []).map((transfer, index) => ({
          id: transfer.id || `received-${index}`,
          amount: Math.abs(transfer.amount || 0),
          description: transfer.description || 'Transfer received',
          timestamp: transfer.timestamp || transfer.createdAt || new Date().toISOString(),
          status: transfer.status || 'completed',
          sender: transfer.fromAccount?.userId || transfer.fromAccountId || 'Unknown',
          type: 'received'
        }));

        const allTransfers = [...sentTransfers, ...receivedTransfers]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        const totalAmountSent = sentTransfers.reduce((acc, t) => acc + t.amount, 0);
        const totalAmountReceived = receivedTransfers.reduce((acc, t) => acc + t.amount, 0);

        setDashboardData({
          balance: fetchedBalance,
          recentTransfers: allTransfers.slice(0, 3),
          amountSent: totalAmountSent,
          amountReceived: totalAmountReceived,
          totalTransactions: sentTransfers.length + receivedTransfers.length
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);

        if (error.response?.status === 401) {
          setError("Session expired. Please log in again.");
        } else if (error.response?.status === 403) {
          setError("Access denied. Please check your permissions.");
        } else if (error.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Failed to load dashboard data: ${error.message || 'Unknown error'}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => `$${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const formatTransactionDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffInHours < 48) {
        return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      }
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-[60vh]">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed animate-spin rounded-full"></div>
              <p className="ml-4 text-gray-600 dark:text-gray-300">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Welcome back</p>
            </div>
            <div className="hidden sm:flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-accent"
                onClick={() => navigate('/settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
                onClick={() => navigate('/transfer')}
              >
                <Send className="w-4 h-4 mr-2" />
                New Transfer
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Available Balance', value: dashboardData.balance, color: 'text-gray-900 dark:text-white', prefix: '$' },
              { label: 'Total Transactions', value: dashboardData.totalTransactions, color: 'text-gray-900 dark:text-white' },
              { label: 'Amount Received', value: dashboardData.amountReceived, color: 'text-green-600 dark:text-green-400', prefix: '$' },
              { label: 'Amount Sent', value: dashboardData.amountSent, color: 'text-red-600 dark:text-red-400', prefix: '$' },
            ].map(({ label, value, color, prefix = '' }, idx) => (
              <Card key={idx} className="card-hover dark:bg-slate-800/50 bg-white border border-gray-100 dark:border-slate-700 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${color}`}>
                    {prefix}<AnimatedCounter end={value} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile & Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Profile */}
            <Card className="card-hover dark:bg-slate-800/50 bg-white border border-gray-100 dark:border-slate-700 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white">
                    {getInitials(user.name || "")}
                  </AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="soft" className="w-full dark:border-slate-700 dark:bg-slate-800/50 dark:text-white" size="sm" onClick={() => navigate('/settings')}>
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Balance */}
            <Card className="card-hover lg:col-span-2 dark:bg-slate-800/50 bg-white border border-gray-100 dark:border-slate-700 shadow-md">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-gray-900 dark:text-white">
                  Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(dashboardData.balance)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Account Id:</span> {user.accountId}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="card-hover dark:bg-slate-800/50 bg-white border border-gray-100 dark:border-slate-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Send Money', icon: Send, path: '/transfer', primary: true },
                  { label: 'Beneficiaries', icon: Users, path: '/beneficiaries' },
                  { label: 'Transactions', icon: History, path: '/transactions' },
                  { label: 'Settings', icon: Settings, path: '/settings' },
                ].map(({ label, icon: Icon, path, primary }, idx) => (
                  <Button
                    key={idx}
                    onClick={() => navigate(path)}
                    className={`h-auto py-4 flex flex-col items-center justify-center text-sm sm:text-base space-y-2 ${primary
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white'
                      : 'border dark:border-slate-700 dark:bg-slate-800/50 dark:text-white'
                      }`}
                    variant={primary ? 'default' : 'soft'}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-hover dark:bg-slate-800/50 bg-white border border-gray-100 dark:border-slate-700 shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Your latest transactions</CardDescription>
              </div>
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                onClick={() => navigate('/transactions')}
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTransfers.length > 0 ? (
                  dashboardData.recentTransfers.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-colors shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'sent'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            }`}
                        >
                          {transaction.type === 'sent' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description ||
                              (transaction.type === 'sent'
                                ? `Sent to ${transaction.recipient || 'Unknown'}`
                                : `Received from ${transaction.sender || 'Unknown'}`)}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTransactionDate(transaction.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`font-semibold ${transaction.type === 'sent'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                          }`}
                      >
                        {transaction.type === 'sent' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">No recent transactions found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>

  );
}