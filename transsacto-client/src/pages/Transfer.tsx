
import { FormEvent, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, ArrowRight, ArrowLeft } from "lucide-react";
import axiosClient from "axios";
import { toast } from "sonner";

export default function Transfer() {
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    description: "",
  });

  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);

  const handleTransfer = async (e: FormEvent) => {
    e.preventDefault();


    try {
      await axiosClient.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/transfer/transfer`,
        {
          amount: Number(formData.amount),
          toUsername: formData.recipient,
          description: formData.description,
        },
        { withCredentials: true }
      );
      toast.success("Transfer successful!");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      toast.error(error.response?.data?.message || "Transfer failed. Please try again.");
    }
  };

  const getTransferTypeStyles = (type: string) => {
    if (type === "sent") {
      return {
        icon: <ArrowRight className="w-5 h-5" />,
        color: "text-red-400",
        bg: "bg-slate-800 border-slate-700",
        prefix: "-$",
      };
    } else {
      return {
        icon: <ArrowLeft className="w-5 h-5" />,
        color: "text-green-400",
        bg: "bg-slate-800 border-slate-700",
        prefix: "+$",
      };
    }
  };

  const mockTransactions = [
    { id: 1, type: "sent", amount: 250.00, recipient: "Alice Smith", date: "2024-05-22", description: "Rent payment" },
    { id: 2, type: "received", amount: 1500.00, sender: "Bob Johnson", date: "2024-05-21", description: "Invoice payment" },
    { id: 3, type: "sent", amount: 75.50, recipient: "Carol Wilson", date: "2024-05-20", description: "Dinner" },
    { id: 4, type: "received", amount: 120.00, sender: "David Brown", date: "2024-05-19", description: "Shared expenses" },
    { id: 5, type: "sent", amount: 45.00, recipient: "Eve Green", date: "2024-05-18", description: "Movie tickets" },
  ];

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Transfer</h1>
          <p className="text-slate-400">Send money and view your transaction history</p>
        </div>

        {/* New Transfer Card */}
        <Card className="card-hover dark-card">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-100">
              <Send className="mr-2 h-5 w-5" /> New Transfer
            </CardTitle>
            <CardDescription className="text-slate-400">Send money to another user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-slate-300">Recipient Username</Label>
                <Input
                  id="recipient"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="Enter username"
                  className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-slate-300">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                  <Input
                    id="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="pl-8 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's this transfer for?"
                  className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-white"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full text-white bg-blue-500">
                Send Money
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Transactions Tabs */}
        {/* <Card className="dark-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-100">Transaction History</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterDialog(true)}
                className="dark:border-slate-700 dark:hover:bg-slate-800 text-white bg-blue-500"
              >
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-4 mb-4 bg-slate-800 ">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">All</TabsTrigger>
                <TabsTrigger value="sent" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">Sent</TabsTrigger>
                <TabsTrigger value="received" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">Received</TabsTrigger>
                <TabsTrigger value="recent" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">Recent</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {mockTransactions.map((transaction) => {
                  const styles = getTransferTypeStyles(transaction.type);
                  return (
                    <div
                      key={transaction.id}
                      className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer ${styles.bg}`}
                      onClick={() => setSelectedTransfer(transaction)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'sent' ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                          {styles.icon}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">
                            {transaction.type === 'sent'
                              ? `To: ${transaction.recipient}`
                              : `From: ${transaction.sender}`
                            }
                          </p>
                          <p className="text-sm text-slate-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={`font-semibold ${styles.color}`}>
                        {styles.prefix}{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="sent" className="space-y-4">
                {mockTransactions
                  .filter(t => t.type === "sent")
                  .map((transaction) => {
                    const styles = getTransferTypeStyles(transaction.type);
                    return (
                      <div
                        key={transaction.id}
                        className="p-4 border rounded-lg flex justify-between items-center cursor-pointer bg-slate-800 border-slate-700"
                        onClick={() => setSelectedTransfer(transaction)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-400">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-200">To: {transaction.recipient}</p>
                            <p className="text-sm text-slate-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="font-semibold text-red-400">
                          -${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
              </TabsContent>

              <TabsContent value="received" className="space-y-4">
                {mockTransactions
                  .filter(t => t.type === "received")
                  .map((transaction) => {
                    const styles = getTransferTypeStyles(transaction.type);
                    return (
                      <div
                        key={transaction.id}
                        className="p-4 border rounded-lg flex justify-between items-center cursor-pointer bg-slate-800 border-slate-700"
                        onClick={() => setSelectedTransfer(transaction)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400">
                            <ArrowLeft className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-200">From: {transaction.sender}</p>
                            <p className="text-sm text-slate-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="font-semibold text-green-400">
                          +${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {mockTransactions
                  .slice(0, 5)
                  .map((transaction) => {
                    const styles = getTransferTypeStyles(transaction.type);
                    return (
                      <div
                        key={transaction.id}
                        className="p-4 border rounded-lg flex justify-between items-center cursor-pointer bg-slate-800 border-slate-700"
                        onClick={() => setSelectedTransfer(transaction)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'sent' ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                            {styles.icon}
                          </div>
                          <div>
                            <p className="font-medium text-slate-200">
                              {transaction.type === 'sent'
                                ? `To: ${transaction.recipient}`
                                : `From: ${transaction.sender}`
                              }
                            </p>
                            <p className="text-sm text-slate-400">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className={`font-semibold ${styles.color}`}>
                          {styles.prefix}{transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card> */}

        {/* Filter Dialog */}
        {/* <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Filter Transactions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-slate-300">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filterData.startDate}
                    onChange={(e) => setFilterData({ ...filterData, startDate: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-slate-300">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filterData.endDate}
                    onChange={(e) => setFilterData({ ...filterData, endDate: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-slate-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount" className="text-slate-300">Min Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                    <Input
                      id="minAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-8 bg-slate-900 border-slate-700 text-slate-100"
                      value={filterData.minAmount}
                      onChange={(e) => setFilterData({ ...filterData, minAmount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount" className="text-slate-300">Max Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                    <Input
                      id="maxAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-8 bg-slate-900 border-slate-700 text-slate-100"
                      value={filterData.maxAmount}
                      onChange={(e) => setFilterData({ ...filterData, maxAmount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setFilterData({ startDate: "", endDate: "", minAmount: "", maxAmount: "" })}
                  className="dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Reset
                </Button>
                <Button className="financial-gradient" onClick={() => setShowFilterDialog(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog> */}

        {/* Transfer Details Dialog */}
        {/* {selectedTransfer && (
          <Dialog open={!!selectedTransfer} onOpenChange={() => setSelectedTransfer(null)}>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Transfer Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={selectedTransfer.type === "sent" ? "destructive" : "default"} 
                    className={selectedTransfer.type === "sent" ? "" : "bg-green-900/30 text-green-400 hover:bg-green-800/40"}
                  >
                    {selectedTransfer.type === "sent" ? "Sent" : "Received"}
                  </Badge>
                  <p className={`text-lg font-bold ${selectedTransfer.type === "sent" ? "text-red-400" : "text-green-400"}`}>
                    {selectedTransfer.type === "sent" ? "-" : "+"}${selectedTransfer.amount.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <p className="text-sm text-slate-400">Date</p>
                      <p className="font-medium text-slate-300">{new Date(selectedTransfer.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">
                        {selectedTransfer.type === "sent" ? "Recipient" : "Sender"}
                      </p>
                      <p className="font-medium text-slate-300">
                        {selectedTransfer.type === "sent" ? selectedTransfer.recipient : selectedTransfer.sender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Description</p>
                      <p className="font-medium text-slate-300">{selectedTransfer.description || "No description provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Transaction ID</p>
                      <p className="font-medium font-mono text-sm text-slate-300">{`TXN${selectedTransfer.id.toString().padStart(8, '0')}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )} */}
      </div>
    </Layout>
  );
}
