
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Transactions() {
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    day: "",
    minAmount: "",
    maxAmount: "",
  });

  const [transactions] = useState([
    {
      id: "TXN001",
      type: "sent",
      amount: 250.00,
      recipient: "Alice Smith",
      recipientUsername: "alice_smith",
      description: "Dinner split",
      date: "2024-01-20T14:30:00Z",
      status: "completed"
    },
    {
      id: "TXN002",
      type: "received",
      amount: 1500.00,
      sender: "Bob Johnson",
      senderUsername: "bob_j",
      description: "Freelance payment",
      date: "2024-01-19T16:15:00Z",
      status: "completed"
    },
    {
      id: "TXN003",
      type: "sent",
      amount: 75.00,
      recipient: "Carol Wilson",
      recipientUsername: "carol_w",
      description: "Book purchase",
      date: "2024-01-18T10:22:00Z",
      status: "pending"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900/30 text-green-400';
      case 'pending': return 'bg-yellow-900/30 text-yellow-400';
      case 'failed': return 'bg-red-900/30 text-red-400';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TransactionList = ({ transactions, title }: { transactions: any[], title: string }) => (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <Card className="text-center py-8 dark-card">
          <CardContent>
            <p className="text-slate-400">No {title.toLowerCase()} found</p>
          </CardContent>
        </Card>
      ) : (
        transactions.map((transaction) => (
          <Card key={transaction.id} className="card-hover dark-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'sent' ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'
                  }`}>
                    {transaction.type === 'sent' ? '↗' : '↙'}
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">
                      {transaction.type === 'sent' 
                        ? `Sent to ${transaction.recipient}`
                        : `Received from ${transaction.sender}`
                      }
                    </p>
                    <p className="text-sm text-slate-400">
                      @{transaction.type === 'sent' ? transaction.recipientUsername : transaction.senderUsername}
                    </p>
                    {transaction.description && (
                      <p className="text-sm text-slate-500 mt-1">{transaction.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.type === 'sent' ? '-' : '+'}${transaction.amount.toFixed(2)}
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                  <p className="text-xs text-slate-400">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="dark:border-slate-700 dark:hover:bg-slate-800">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">Transaction Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-slate-400">Transaction ID</Label>
                          <p className="text-sm font-mono text-slate-300">{transaction.id}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-400">Status</Label>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-400">Amount</Label>
                          <p className={`text-sm font-semibold ${
                            transaction.type === 'sent' ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {transaction.type === 'sent' ? '-' : '+'}${transaction.amount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-slate-400">Date</Label>
                          <p className="text-sm text-slate-300">{formatDate(transaction.date)}</p>
                        </div>
                        <div className="col-span-2">
                          <Label className="text-sm font-medium text-slate-400">
                            {transaction.type === 'sent' ? 'Recipient' : 'Sender'}
                          </Label>
                          <p className="text-sm text-slate-300">
                            {transaction.type === 'sent' ? transaction.recipient : transaction.sender}
                            <span className="text-slate-400 ml-1">
                              (@{transaction.type === 'sent' ? transaction.recipientUsername : transaction.senderUsername})
                            </span>
                          </p>
                        </div>
                        {transaction.description && (
                          <div className="col-span-2">
                            <Label className="text-sm font-medium text-slate-400">Description</Label>
                            <p className="text-sm text-slate-300">{transaction.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Transactions</h1>
            <p className="text-slate-400">View and manage your transaction history</p>
          </div>

          {/* Filters Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="dark:border-slate-700 dark:hover:bg-slate-800">Filters</Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Filter Transactions</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="year" className="text-slate-300">Year</Label>
                    <Select value={filters.year} onValueChange={(value) => setFilters({...filters, year: value})}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="month" className="text-slate-300">Month</Label>
                    <Select value={filters.month} onValueChange={(value) => setFilters({...filters, month: value})}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <SelectItem value="01">January</SelectItem>
                        <SelectItem value="02">February</SelectItem>
                        <SelectItem value="03">March</SelectItem>
                        {/* Add more months */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="day" className="text-slate-300">Day</Label>
                    <Input
                      id="day"
                      type="number"
                      min="1"
                      max="31"
                      placeholder="Day"
                      value={filters.day}
                      onChange={(e) => setFilters({...filters, day: e.target.value})}
                      className="bg-slate-900 border-slate-700 text-slate-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minAmount" className="text-slate-300">Min Amount</Label>
                    <Input
                      id="minAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={filters.minAmount}
                      onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                      className="bg-slate-900 border-slate-700 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAmount" className="text-slate-300">Max Amount</Label>
                    <Input
                      id="maxAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={filters.maxAmount}
                      onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                      className="bg-slate-900 border-slate-700 text-slate-100"
                    />
                  </div>
                </div>
                <Button className="w-full financial-gradient">Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Transaction Tabs */}
        <Tabs defaultValue="all" className="space-y-6 p-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">All Transactions</TabsTrigger>
            <TabsTrigger value="sent" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">Sent</TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">Received</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">Last 5</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <TransactionList transactions={transactions} title="transactions" />
          </TabsContent>

          <TabsContent value="sent">
            <TransactionList 
              transactions={transactions.filter(t => t.type === 'sent')} 
              title="sent transactions" 
            />
          </TabsContent>

          <TabsContent value="received">
            <TransactionList 
              transactions={transactions.filter(t => t.type === 'received')} 
              title="received transactions" 
            />
          </TabsContent>

          <TabsContent value="recent">
            <TransactionList 
              transactions={transactions.slice(0, 5)} 
              title="recent transactions" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
