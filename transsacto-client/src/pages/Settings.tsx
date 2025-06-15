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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import axiosClient from "@/lib/axiosClient";
import { toast } from "sonner";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosClient.post("/user/update-password", {
        oldPassword: currentPassword,
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-slate-400">Manage your account preferences</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Security Settings */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Security</CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-400">
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-800 dark:text-white">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-800 dark:text-white">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-800 dark:text-white">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-gray-900 dark:text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className="financial-gradient text-white"
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Notifications</CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-400">
              Choose what notifications you'd like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-gray-800 dark:text-white">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Receive email notifications about your transactions
                </p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-gray-200 dark:bg-slate-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-gray-800 dark:text-white">
                  Transaction Alerts
                </Label>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Get notified when you send or receive money
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-gray-200 dark:bg-slate-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-gray-800 dark:text-white">
                  Security Alerts
                </Label>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Important security notifications about your account
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Transfer Limits */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Transfer Limits</CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-400">
              Your current transfer limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-800 dark:text-white">Daily Limit</Label>
                <div className="text-2xl font-bold text-green-600">$5,000</div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-800 dark:text-white">Monthly Limit</Label>
                <div className="text-2xl font-bold text-green-600">$50,000</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              To increase your limits, please contact our support team.
            </p>
            <Button
              variant="outline"
              className="border border-slate-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-white"
            >
              Request Limit Increase
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>

  );
}