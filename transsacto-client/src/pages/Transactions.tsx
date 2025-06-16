import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import axiosClient from "@/lib/axiosClient";
import { ArrowRight, ArrowLeft, Loader2, RefreshCw } from "lucide-react";

export default function Transactions() {
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    day: "",
    minAmount: "",
    maxAmount: "",
  });

  const [sentTransactions, setSentTransactions] = useState([]);
  const [receivedTransactions, setReceivedTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch transactions from API
  const fetchTransactions = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      setError(null);

      // Fetch sent transfers
      const sentResponse = await axiosClient.get('/transfer/sent');

      // Fetch received transfers
      const receivedResponse = await axiosClient.get('/transfer/received');

      const sentData = sentResponse.data;
      const receivedData = receivedResponse.data;

      // Transform API data to match component structure
      const transformedSent = (sentData.data?.sentTransfers || []).map(transfer => ({
        id: transfer.id.toString(),
        type: "sent",
        amount: parseFloat(transfer.amount),
        recipient: `Account ${transfer.toAccount.id}`,
        recipientAccountId: transfer.toAccountId,
        recipientAccountType: transfer.toAccount.type,
        recipientAccountCategory: transfer.toAccount.category,
        description: transfer.description,
        date: transfer.timestamp,
        status: transfer.status.toLowerCase(),
        fromAccountId: transfer.fromAccountId,
        toAccountId: transfer.toAccountId,
        transferType: transfer.type
      }));

      // Assuming received transfers have similar structure
      const transformedReceived = (receivedData.data?.receivedTransfers || []).map(transfer => ({
        id: transfer.id.toString(),
        type: "received",
        amount: parseFloat(transfer.amount),
        sender: `Account ${transfer.fromAccount.id}`,
        senderAccountId: transfer.fromAccountId,
        senderAccountType: transfer.fromAccount.type,
        senderAccountCategory: transfer.fromAccount.category,
        description: transfer.description,
        date: transfer.timestamp,
        status: transfer.status.toLowerCase(),
        fromAccountId: transfer.fromAccountId,
        toAccountId: transfer.toAccountId,
        transferType: transfer.type
      }));

      setSentTransactions(transformedSent);
      setReceivedTransactions(transformedReceived);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Combine all transactions
  const allTransactions = [...sentTransactions, ...receivedTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Apply filters
  const applyFilters = (transactions) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear().toString();
      const transactionMonth = (transactionDate.getMonth() + 1).toString().padStart(2, '0');
      const transactionDay = transactionDate.getDate().toString();

      // Date filters
      if (filters.year && transactionYear !== filters.year) return false;
      if (filters.month && transactionMonth !== filters.month) return false;
      if (filters.day && transactionDay !== filters.day) return false;

      // Amount filters
      if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false;

      return true;
    });
  };

  const filteredAllTransactions = applyFilters(allTransactions);
  const filteredSentTransactions = applyFilters(sentTransactions);
  const filteredReceivedTransactions = applyFilters(receivedTransactions);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearFilters = () => {
    setFilters({
      year: "",
      month: "",
      day: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  const TransactionList = ({ transactions, title }) => {
    if (loading) {
      return (
        <div className="px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed animate-spin rounded-full"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">Loading transactions...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Card className="text-center py-8 dark-card border-red-900/30">
          <CardContent className="space-y-4">
            <p className="text-red-400">Error loading transactions: {error}</p>
            <Button
              onClick={() => fetchTransactions()}
              variant="destructive"
              className="dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <Card className="text-center py-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400">
                No {title.toLowerCase()} found
              </p>
            </CardContent>
          </Card>
        ) : (
          transactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="card-hover bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === "sent"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                    >
                      {transaction.type === "sent" ? (
                        <ArrowRight className="w-5 h-5" />
                      ) : (
                        <ArrowLeft className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">
                        {transaction.type === "sent"
                          ? `Sent to ${transaction.recipient || "Unknown"}`
                          : `Received from ${transaction.sender || "Unknown"}`}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {transaction.type === "sent"
                          ? `${transaction.recipientAccountType} - ${transaction.recipientAccountCategory}`
                          : `${transaction.senderAccountType} - ${transaction.senderAccountCategory}`}
                      </p>
                      {transaction.description && (
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                          {transaction.description}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {transaction.transferType} • ID: {transaction.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div
                      className={`text-lg font-semibold ${transaction.type === "sent"
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                        }`}
                    >
                      {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="border border-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-slate-700 dark:text-slate-100">
                          Transaction Details
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Transaction ID
                            </Label>
                            <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                              {transaction.id}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Status
                            </Label>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Amount
                            </Label>
                            <p
                              className={`text-sm font-semibold ${transaction.type === "sent"
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                                }`}
                            >
                              {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Date
                            </Label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Transfer Type
                            </Label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {transaction.transferType}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              {transaction.type === "sent" ? "To Account" : "From Account"}
                            </Label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              Account {transaction.type === "sent" ? transaction.toAccountId : transaction.fromAccountId}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Account Details
                            </Label>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {transaction.type === "sent"
                                ? `${transaction.recipientAccountType} - ${transaction.recipientAccountCategory}`
                                : `${transaction.senderAccountType} - ${transaction.senderAccountCategory}`}
                            </p>
                          </div>
                          {transaction.description && (
                            <div className="col-span-2">
                              <Label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Description
                              </Label>
                              <p className="text-sm text-slate-700 dark:text-slate-300">
                                {transaction.description}
                              </p>
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
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Transactions</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your transaction history</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Refresh Button */}
            <Button
              onClick={() => fetchTransactions(true)}
              variant="outline"
              size="sm"
              disabled={refreshing}
              className="border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-accent dark:text-accent-foreground"
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>

            {/* Filters Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-accent dark:text-accent-foreground"
                  variant="outline"
                  size="sm"
                >
                  Filters
                  {(filters.year || filters.month || filters.day || filters.minAmount || filters.maxAmount) && (
                    <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 flex items-center justify-center">
                      !
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-slate-100">Filter Transactions</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="year" className="text-gray-700 dark:text-slate-300">Year</Label>
                      <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
                        <SelectTrigger className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200">
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="month" className="text-gray-700 dark:text-slate-300">Month</Label>
                      <Select value={filters.month} onValueChange={(value) => setFilters({ ...filters, month: value })}>
                        <SelectTrigger className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200">
                          <SelectItem value="01">January</SelectItem>
                          <SelectItem value="02">February</SelectItem>
                          <SelectItem value="03">March</SelectItem>
                          <SelectItem value="04">April</SelectItem>
                          <SelectItem value="05">May</SelectItem>
                          <SelectItem value="06">June</SelectItem>
                          <SelectItem value="07">July</SelectItem>
                          <SelectItem value="08">August</SelectItem>
                          <SelectItem value="09">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="day" className="text-gray-700 dark:text-slate-300">Day</Label>
                      <Input
                        id="day"
                        type="number"
                        min="1"
                        max="31"
                        placeholder="Day"
                        value={filters.day}
                        onChange={(e) => setFilters({ ...filters, day: e.target.value })}
                        className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="minAmount" className="text-gray-700 dark:text-slate-300">Min Amount</Label>
                      <Input
                        id="minAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                        className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxAmount" className="text-gray-700 dark:text-slate-300">Max Amount</Label>
                      <Input
                        id="maxAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                        className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={clearFilters} variant="soft" className="flex-1 border-gray-300 dark:border-slate-600 dark:hover:bg-slate-500 dark:bg-slate-700">
                      Clear Filters
                    </Button>
                    <Button className="flex-1 financial-gradient text-white">Apply Filters</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Total Sent</p>
                  <p className="text-2xl font-bold text-red-500">
                    ${sentTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="text-red-500 text-xl">↗</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">{sentTransactions.length} transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Total Received</p>
                  <p className="text-2xl font-bold text-green-500">
                    ${receivedTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="text-green-500 text-xl">↙</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">{receivedTransactions.length} transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Net Balance</p>
                  <p
                    className={`text-2xl font-bold ${(receivedTransactions.reduce((sum, t) => sum + t.amount, 0) -
                      sentTransactions.reduce((sum, t) => sum + t.amount, 0)) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                      }`}
                  >
                    ${(
                      receivedTransactions.reduce((sum, t) => sum + t.amount, 0) -
                      sentTransactions.reduce((sum, t) => sum + t.amount, 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-500 text-xl">∑</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">{allTransactions.length} total transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <TabsTrigger
              value="all"
              className="text-gray-800 dark:text-gray-300 data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
            >
              All ({filteredAllTransactions.length})
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              className="text-gray-800 dark:text-gray-300 data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
            >
              Sent ({filteredSentTransactions.length})
            </TabsTrigger>
            <TabsTrigger
              value="received"
              className="text-gray-800 dark:text-gray-300 data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
            >
              Received ({filteredReceivedTransactions.length})
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="text-gray-800 dark:text-gray-300 data-[state=active]:bg-gray-300 dark:data-[state=active]:bg-slate-700 data-[state=active]:text-black dark:data-[state=active]:text-white"
            >
              Recent
            </TabsTrigger>
          </TabsList>


          <TabsContent value="all">
            <TransactionList transactions={filteredAllTransactions} title="transactions" />
          </TabsContent>
          <TabsContent value="sent">
            <TransactionList transactions={filteredSentTransactions} title="sent transactions" />
          </TabsContent>
          <TabsContent value="received">
            <TransactionList transactions={filteredReceivedTransactions} title="received transactions" />
          </TabsContent>
          <TabsContent value="recent">
            <TransactionList transactions={filteredAllTransactions.slice(0, 5)} title="recent transactions" />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>

  );
}