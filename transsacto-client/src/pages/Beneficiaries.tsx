import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import axiosClient from "axios";
import { toast } from "sonner";
import axios from "axios";

interface Beneficiary {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  email: string;
  phone: string;
  accountId: number;
}
interface AddBeneficiaries {
  name: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  email: string;
  phone: string;
  accountId: number;
}

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const [newBeneficiary, setNewBeneficiary] = useState<AddBeneficiaries>({
    name: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    email: "",
    phone: "",
    accountId: 0,
  });

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/beneficiary/beneficiaries`, {
          withCredentials: true,
        });
        setBeneficiaries(response?.data?.data);
      } catch (error) {
        toast.error("Failed to fetch beneficiaries. Please try again.");
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/beneficiary/beneficiaries",
        newBeneficiary,
        { withCredentials: true }
      );
      console.log("Success Response:", response.data);
      toast.success("Beneficiary added successfully!");
    } catch (err) {
      let errorMessage = "Failed to add new beneficiary. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || errorMessage;
      } else {
        console.error("Unexpected error:", err);
      }

      console.error("Error Response:", err);
      toast.error(errorMessage);
    }
  };

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const getRelationshipColor = (relationship: string) => {
    switch (relationship.toLowerCase()) {
      case 'family': return 'bg-green-900/30 text-green-400';
      case 'friend': return 'bg-blue-900/30 text-blue-400';
      case 'business': return 'bg-purple-900/30 text-purple-400';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Beneficiaries</h1>
            <p className="text-slate-400">Manage your trusted recipients</p>
          </div>

          {/* Add Beneficiary Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white bg-blue-500">Add Beneficiary</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-slate-800 border-blue-500">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Beneficiary</DialogTitle>
                <DialogDescription className="text-white">
                  Add a new person to your beneficiaries list for easy transfers.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newBeneficiary.name}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                      className="bg-slate-900 text-white border-blue-500 border-2 placeholder:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-slate-300">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={newBeneficiary.accountNumber}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, accountNumber: e.target.value })}
                      className="bg-slate-900 text-white border-blue-500 border-2 placeholder:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-slate-300">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="Enter bank name"
                      value={newBeneficiary.bankName}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, bankName: e.target.value })}
                      className="bg-slate-900  text-white border-blue-500 border-2 placeholder:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode" className="text-slate-300">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      placeholder="Enter IFSC code"
                      value={newBeneficiary.ifscCode}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, ifscCode: e.target.value })}
                      className="bg-slate-900  text-white border-blue-500 border-2 placeholder:text-white"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="text-white bg-blue-500">Add Beneficiary</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Beneficiaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficiaries.map((beneficiary) => (
            <Card key={beneficiary.id} className="card-hover dark-card">
              <CardHeader className="text-center">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarFallback className="text-lg financial-gradient text-white">
                    {beneficiary.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg text-slate-100">{beneficiary.name}</CardTitle>

              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-2 text-sm text-slate-300">
                  <div>
                    <span className="font-medium text-slate-400">Account:</span>
                    <p className="font-mono text-slate-300">{beneficiary.accountNumber}</p>
                  </div>
                  <div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 dark:border-slate-700 dark:hover:bg-slate-800">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-slate-100">{beneficiary.name}</DialogTitle>
                        <DialogDescription className="text-slate-400">Beneficiary Details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-slate-400">Account Number</Label>
                            <p className="text-sm font-mono text-slate-300">{beneficiary.accountNumber}</p>
                          </div>

                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="dark:border-slate-700 dark:hover:bg-slate-800">Edit</Button>
                        <Button variant="destructive">Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button size="sm" className="flex-1 financial-gradient">
                    Send Money
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {beneficiaries.length === 0 && (
          <Card className="text-center py-12 dark-card">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-100">No beneficiaries yet</h3>
                  <p className="text-white">Add your first beneficiary to start sending money quickly.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
