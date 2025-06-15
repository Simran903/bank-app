import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosClient from "@/lib/axiosClient";

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

interface NewBeneficiary {
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
  const [loading, setLoading] = useState(true);
  const [addingBeneficiary, setAddingBeneficiary] = useState(false);
  const [updatingBeneficiary, setUpdatingBeneficiary] = useState(false);
  const [deletingBeneficiary, setDeletingBeneficiary] = useState<number | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [newBeneficiary, setNewBeneficiary] = useState<NewBeneficiary>({
    name: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    email: "",
    phone: "",
    accountId: 1,
  });

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Beneficiary | null>(null);
  const [editBeneficiary, setEditBeneficiary] = useState<Beneficiary | null>(
    null
  );

  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/beneficiary/beneficiaries");

      let beneficiariesData = [];
      if (response.data.beneficiaries) {
        beneficiariesData = response.data.beneficiaries;
      } else if (Array.isArray(response.data)) {
        beneficiariesData = response.data;
      } else if (response.data.data) {
        beneficiariesData = response.data.data;
      }

      setBeneficiaries(beneficiariesData);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch beneficiaries"
      );
      setBeneficiaries([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch beneficiary by ID
  const fetchBeneficiaryById = async (id: number) => {
    try {
      const response = await axiosClient.get(
        `/beneficiary/beneficiaries/${id}`
      );

      let beneficiaryData = null;

      if (response.data.beneficiary) {
        beneficiaryData = response.data.beneficiary;
      } else if (response.data.data) {
        beneficiaryData = response.data.data;
      } else {
        beneficiaryData = response.data;
      }

      return beneficiaryData;
    } catch (error) {
      console.error("Error fetching beneficiary by ID:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch beneficiary details"
      );
      return null;
    }
  };

  const handleAddBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddingBeneficiary(true);

      const response = await axiosClient.post(
        "/beneficiary/beneficiaries",
        newBeneficiary
      );

      toast.success("Beneficiary added successfully");

      setNewBeneficiary({
        name: "",
        accountNumber: "",
        bankName: "",
        ifscCode: "",
        email: "",
        phone: "",
        accountId: 1,
      });
      setIsAddDialogOpen(false);

      await fetchBeneficiaries();
    } catch (error) {
      console.error("Error adding beneficiary:", error);
      toast.error(error.response?.data?.message || "Failed to add beneficiary");
    } finally {
      setAddingBeneficiary(false);
    }
  };

  // Update beneficiary
  const handleUpdateBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBeneficiary) return;

    try {
      setUpdatingBeneficiary(true);
      const updateData = {
        name: editBeneficiary.name,
        accountNumber: editBeneficiary.accountNumber,
        bankName: editBeneficiary.bankName,
        ifscCode: editBeneficiary.ifscCode,
        email: editBeneficiary.email,
        phone: editBeneficiary.phone,
        accountId: editBeneficiary.accountId,
      };

      await axiosClient.put(
        `/beneficiary/beneficiaries/${editBeneficiary.id}`,
        updateData
      );

      toast.success("Beneficiary updated successfully");
      setIsEditMode(false);
      setEditBeneficiary(null);
      setIsDetailsDialogOpen(false);

      await fetchBeneficiaries();
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      toast.error(
        error.response?.data?.message || "Failed to update beneficiary"
      );
    } finally {
      setUpdatingBeneficiary(false);
    }
  };

  const handleDeleteBeneficiary = async (id: number) => {
    if (!confirm("Are you sure you want to delete this beneficiary?")) return;

    try {
      setDeletingBeneficiary(id);
      await axiosClient.delete(`/beneficiary/beneficiaries/${id}`);
      toast.success("Beneficiary deleted successfully");
      setIsDetailsDialogOpen(false);

      await fetchBeneficiaries();
    } catch (error) {
      console.error("Error deleting beneficiary:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete beneficiary"
      );
    } finally {
      setDeletingBeneficiary(null);
    }
  };

  const handleViewDetails = async (beneficiary: Beneficiary) => {
    const detailedBeneficiary = await fetchBeneficiaryById(beneficiary.id);
    if (detailedBeneficiary) {
      setSelectedBeneficiary(detailedBeneficiary);
      setIsDetailsDialogOpen(true);
    }
  };

  const handleStartEdit = () => {
    setEditBeneficiary(selectedBeneficiary);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditBeneficiary(null);
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-[60vh]">
              <div className="w-12 h-12 border-4 border-blue-500 border-dashed animate-spin rounded-full"></div>
              <p className="ml-4 text-gray-600 dark:text-gray-300">Loading beneficiaries...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Beneficiaries
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Manage your trusted recipients
            </p>
            <p className="text-xs text-slate-500">
              Total beneficiaries: {beneficiaries.length}
            </p>
          </div>

          {/* Add Beneficiary Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="financial-gradient text-white w-full sm:w-auto">
                <span className="sm:hidden">Add Beneficiary</span>
                <span className="hidden sm:inline">Add Beneficiary</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto dark:bg-slate-800 bg-white border-slate-700">
              <DialogHeader>
                <DialogTitle className="dark:text-slate-100 text-black">
                  Add New Beneficiary
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  Add a new person to your beneficiaries list for easy
                  transfers.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBeneficiary}>
                <div className="space-y-4 py-4 max-h-[90vh] overflow-y-auto">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-400">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={newBeneficiary.name}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          name: e.target.value,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-slate-400">
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      placeholder="Enter account number"
                      value={newBeneficiary.accountNumber}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          accountNumber: e.target.value,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName" className="text-slate-400">
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      placeholder="Enter bank name"
                      value={newBeneficiary.bankName}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          bankName: e.target.value,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode" className="text-slate-400">
                      IFSC Code
                    </Label>
                    <Input
                      id="ifscCode"
                      placeholder="Enter IFSC code"
                      value={newBeneficiary.ifscCode}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          ifscCode: e.target.value.toUpperCase(),
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-400">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newBeneficiary.email}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          email: e.target.value,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-400">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={newBeneficiary.phone}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          phone: e.target.value,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100 placeholder:text-slate-800 dark:placeholder:text-slate-300"
                      required
                      disabled={addingBeneficiary}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountId" className="text-slate-400">
                      Account ID
                    </Label>
                    <Input
                      id="accountId"
                      type="number"
                      placeholder="Enter account ID"
                      value={newBeneficiary.accountId}
                      onChange={(e) =>
                        setNewBeneficiary({
                          ...newBeneficiary,
                          accountId: parseInt(e.target.value) || 1,
                        })
                      }
                      className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                      required
                      disabled={addingBeneficiary}
                      min="1"
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    type="submit"
                    className="financial-gradient text-white w-full sm:w-auto"
                    disabled={addingBeneficiary}
                  >
                    {addingBeneficiary ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Beneficiary"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Beneficiaries Grid */}
        {beneficiaries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {beneficiaries.map((beneficiary) => (
              <Card key={beneficiary.id} className="card-hover dark-card border border-slate-200">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto">
                    <AvatarFallback className="text-sm sm:text-lg financial-gradient text-white">
                      {beneficiary.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle
                    className="text-lg dark:text-slate-100 text-slate-500 truncate"
                    title={beneficiary.name}
                  >
                    {beneficiary.name}
                  </CardTitle>
                  <CardDescription
                    className="text-sm text-slate-400 truncate"
                    title={beneficiary.email}
                  >
                    {beneficiary.email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 py-4">
                  <div className="text-slate-300 flex justify-between">
                    <div>
                      <span className="font-medium text-slate-400">Bank:</span>
                      <p
                        className="text-sm text-slate-300 truncate"
                        title={beneficiary.bankName}
                      >
                        {beneficiary.bankName}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-400">
                        Account:
                      </span>
                      <p
                        className="text-sm font-mono text-slate-300 truncate"
                        title={beneficiary.accountNumber}
                      >
                        {beneficiary.accountNumber}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-slate-400">IFSC:</span>
                      <p className="text-sm font-mono text-slate-300">
                        {beneficiary.ifscCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                    <Button
                      variant="soft"
                      size="sm"
                      className="flex-1 dark:border-slate-700 dark:bg-slate-800"
                      onClick={() => handleViewDetails(beneficiary)}
                    >
                      View Details
                    </Button>

                    <Button
                      size="sm"
                      className="flex-1 financial-gradient text-white"
                    >
                      Send Money
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="text-center py-8 sm:py-12 dark-card">
            <CardContent>
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-slate-100">
                    No beneficiaries yet
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 px-4">
                    Add your first beneficiary to start sending money quickly.
                  </p>
                </div>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="financial-gradient w-full sm:w-auto">
                      Add Your First Beneficiary
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Beneficiary Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="w-[95vw] max-w-2xl mx-auto bg-white dark:bg-slate-800 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="dark:text-slate-100 text-lg sm:text-xl">
                {isEditMode ? "Edit Beneficiary" : selectedBeneficiary?.name}
              </DialogTitle>
              <DialogDescription className="dark:text-slate-300 text-slate-500">
                {isEditMode
                  ? "Update beneficiary information"
                  : "Beneficiary Details"}
              </DialogDescription>
            </DialogHeader>

            {isEditMode && editBeneficiary ? (
              <form onSubmit={handleUpdateBeneficiary}>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Full Name
                      </Label>
                      <Input
                        value={editBeneficiary.name}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            name: e.target.value,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-400">
                        Account Number
                      </Label>
                      <Input
                        value={editBeneficiary.accountNumber}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            accountNumber: e.target.value,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-400">
                        Bank Name
                      </Label>
                      <Input
                        value={editBeneficiary.bankName}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            bankName: e.target.value,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-400">
                        IFSC Code
                      </Label>
                      <Input
                        value={editBeneficiary.ifscCode}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            ifscCode: e.target.value.toUpperCase(),
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-400">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={editBeneficiary.email}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            email: e.target.value,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-400">
                        Phone Number
                      </Label>
                      <Input
                        type="tel"
                        value={editBeneficiary.phone}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            phone: e.target.value,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-sm font-medium text-slate-400">
                        Account ID
                      </Label>
                      <Input
                        type="number"
                        value={editBeneficiary.accountId}
                        onChange={(e) =>
                          setEditBeneficiary({
                            ...editBeneficiary,
                            accountId: parseInt(e.target.value) || 1,
                          })
                        }
                        className="dark:bg-slate-900 bg-transparent border-slate-700 dark:text-slate-100"
                        required
                        disabled={updatingBeneficiary}
                        min="1"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto dark:border-slate-700 dark:hover:bg-slate-800"
                    disabled={updatingBeneficiary}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto financial-gradient text-white"
                    disabled={updatingBeneficiary}
                  >
                    {updatingBeneficiary ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            ) : selectedBeneficiary ? (
              <>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Email
                      </Label>
                      <p className="text-sm dark:text-slate-300 text-slate-500 break-all">
                        {selectedBeneficiary.email}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Phone
                      </Label>
                      <p className="text-sm dark:text-slate-300 text-slate-500">
                        {selectedBeneficiary.phone}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Bank Name
                      </Label>
                      <p className="text-sm dark:text-slate-300 text-slate-500">
                        {selectedBeneficiary.bankName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium dark:text-slate-400">
                        IFSC Code
                      </Label>
                      <p className="text-sm font-mono dark:text-slate-300 text-slate-500">
                        {selectedBeneficiary.ifscCode}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Account Number
                      </Label>
                      <p className="text-sm font-mono dark:text-slate-300 text-slate-500 break-all">
                        {selectedBeneficiary.accountNumber}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium dark:text-slate-400">
                        Account ID
                      </Label>
                      <p className="text-sm dark:text-slate-300 text-slate-500">
                        {selectedBeneficiary.accountId}
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={handleStartEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      handleDeleteBeneficiary(selectedBeneficiary.id)
                    }
                    disabled={deletingBeneficiary === selectedBeneficiary.id}
                  >
                    {deletingBeneficiary === selectedBeneficiary.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </DialogFooter>
              </>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
