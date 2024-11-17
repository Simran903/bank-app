"use client";
import axiosClient from "@/constants/axiosClient";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { baseUrl } from "@/constants";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

type AccountDetails = {
  accountId: string;
  type: string;
};

export function UserNav() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleLogout = async () => {
    try {
      await axiosClient.post(`${baseUrl}/user/signout`, {});
      localStorage.clear();
      router.push("/");
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  const fetchAccountDetails = async () => {
    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        setError("User not found. Please log in.");
        return;
      }

      const response = await axiosClient.post<{ data: AccountDetails }>(`${baseUrl}/user/account-details`, {
        user_id: userId,
      });
      setAccountDetails(response?.data?.data);
      console.log(response?.data?.data);
    } catch (err) {
      setError("Failed to fetch account details. Please try again.");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await axiosClient.post<{ data: { success: boolean; message?: string } }>(`${baseUrl}/user/update-password`, {
        oldPassword,
        newPassword,
      });

      if (response?.data?.data?.success) {
        alert("Password updated successfully.");
        setIsModalOpen(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(response?.data?.data?.message || "Failed to update password.");
      }
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <>
      <DropdownMenu onOpenChange={(open) => open && fetchAccountDetails()}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full text-white">
            <Avatar className="h-8 w-8">
              <AvatarFallback>+</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {accountDetails && (
                <div className="mt-2 text-xs leading-none text-muted-foreground">
                  <p>Account Id: {accountDetails?.accountId}</p>
                  <p>Account Type: {accountDetails?.type}</p>
                </div>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </DropdownMenuContent>
      </DropdownMenu>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Update Password</h2>
            <div className="mb-3">
              <label className="block text-sm font-medium">Current Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={oldPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 border rounded-md"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handlePasswordUpdate}>Update</Button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}