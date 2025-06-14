import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, History, Settings, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [user] = useState({
    name: "John Doe",
    username: "johndoe",
    profilePicture: "",
    balance: 12543.67,
    accountNumber: "1234567890",
    accountType: "Savings",
    joinDate: "January 2024"
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {user.name}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                New Transfer
              </Button>
            </div>
          </div>

          {/* Profile & Balance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl text-gray-900 dark:text-white">{user.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">@{user.username}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50" 
                  size="sm"
                >
                  Upload Picture
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50" 
                  size="sm"
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Balance Card */}
            <Card className="card-hover lg:col-span-2 dark:bg-slate-800/50 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                  Account Balance
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/40">
                    {user.accountType}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Account Number:</span> {user.accountNumber}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">Member Since:</span> {user.joinDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button 
                  className="h-20 flex flex-col space-y-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
                >
                  <Send className="w-6 h-6" />
                  <span>Send Money</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50"
                >
                  <Users className="w-6 h-6" />
                  <span>Beneficiaries</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50"
                >
                  <History className="w-6 h-6" />
                  <span>Transactions</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col space-y-2 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-white dark:hover:text-white dark:bg-slate-800/50"
                >
                  <Settings className="w-6 h-6 " />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-hover dark:bg-slate-800/50 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Your latest transactions</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, type: "sent", amount: -250.00, recipient: "Alice Smith", date: "Today, 2:30 PM" },
                  { id: 2, type: "received", amount: 1500.00, sender: "Bob Johnson", date: "Yesterday, 4:15 PM" },
                  { id: 3, type: "sent", amount: -75.00, recipient: "Carol Wilson", date: "Dec 20, 10:22 AM" },
                ].map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'sent' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                        {transaction.type === 'sent' ? '↑' : '↓'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.type === 'sent' 
                            ? `Sent to ${transaction.recipient}` 
                            : `Received from ${transaction.sender}`
                          }
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'sent' 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {transaction.type === 'sent' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
