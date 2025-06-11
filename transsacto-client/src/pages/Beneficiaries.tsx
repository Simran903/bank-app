
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function Beneficiaries() {
  const [beneficiaries] = useState([
    { id: 1, name: "Alice Smith", username: "alice_smith", accountNumber: "1234567890", relationship: "Friend", addedDate: "2024-01-15" },
    { id: 2, name: "Bob Johnson", username: "bob_j", accountNumber: "0987654321", relationship: "Family", addedDate: "2024-02-20" },
    { id: 3, name: "Carol Wilson", username: "carol_w", accountNumber: "1122334455", relationship: "Business", addedDate: "2024-03-10" },
  ]);

  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    username: "",
    accountNumber: "",
    relationship: "",
  });

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding beneficiary:", newBeneficiary);
    setNewBeneficiary({ name: "", username: "", accountNumber: "", relationship: "" });
  };

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
              <Button className="financial-gradient">Add Beneficiary</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Add New Beneficiary</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new person to your beneficiaries list for easy transfers.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBeneficiary}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newBeneficiary.name}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-slate-100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-slate-300">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter username"
                      value={newBeneficiary.username}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, username: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-slate-100"
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
                      className="bg-slate-900 border-slate-700 text-slate-100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-slate-300">Relationship</Label>
                    <Input
                      id="relationship"
                      placeholder="e.g., Friend, Family, Business"
                      value={newBeneficiary.relationship}
                      onChange={(e) => setNewBeneficiary({ ...newBeneficiary, relationship: e.target.value })}
                      className="bg-slate-900 border-slate-700 text-slate-100"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="financial-gradient">Add Beneficiary</Button>
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
                <CardDescription className="text-slate-400">@{beneficiary.username}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className={getRelationshipColor(beneficiary.relationship)}>
                    {beneficiary.relationship}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-slate-300">
                  <div>
                    <span className="font-medium text-slate-400">Account:</span>
                    <p className="font-mono text-slate-300">{beneficiary.accountNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-400">Added:</span>
                    <p className="text-slate-300">{new Date(beneficiary.addedDate).toLocaleDateString()}</p>
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
                            <Label className="text-sm font-medium text-slate-400">Username</Label>
                            <p className="text-sm text-slate-300">@{beneficiary.username}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-slate-400">Relationship</Label>
                            <p className="text-sm text-slate-300">{beneficiary.relationship}</p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm font-medium text-slate-400">Account Number</Label>
                            <p className="text-sm font-mono text-slate-300">{beneficiary.accountNumber}</p>
                          </div>
                          <div className="col-span-2">
                            <Label className="text-sm font-medium text-slate-400">Added Date</Label>
                            <p className="text-sm text-slate-300">{new Date(beneficiary.addedDate).toLocaleDateString()}</p>
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
                  <p className="text-slate-400">Add your first beneficiary to start sending money quickly.</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="financial-gradient">Add Your First Beneficiary</Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
