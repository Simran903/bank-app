
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-6 max-w-2xl mx-auto p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="card-hover dark-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Profile Information</CardTitle>
            <CardDescription className="text-slate-400">Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                <Input id="fullName" defaultValue="John Doe" className="bg-slate-900 border-slate-700 text-slate-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">Username</Label>
                <Input id="username" defaultValue="johndoe" className="bg-slate-900 border-slate-700 text-slate-100" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-slate-900 border-slate-700 text-slate-100" />
            </div>
            <Button className="financial-gradient">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-hover dark-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Security</CardTitle>
            <CardDescription className="text-slate-400">Manage your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
              <Input id="currentPassword" type="password" className="bg-slate-900 border-slate-700 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
              <Input id="newPassword" type="password" className="bg-slate-900 border-slate-700 text-slate-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="bg-slate-900 border-slate-700 text-slate-100" />
            </div>
            <Button className="financial-gradient">Change Password</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-hover dark-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Notifications</CardTitle>
            <CardDescription className="text-slate-400">Choose what notifications you'd like to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-slate-300">Email Notifications</Label>
                <p className="text-sm text-slate-400">
                  Receive email notifications about your transactions
                </p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-slate-300">Transaction Alerts</Label>
                <p className="text-sm text-slate-400">
                  Get notified when you send or receive money
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-slate-300">Security Alerts</Label>
                <p className="text-sm text-slate-400">
                  Important security notifications about your account
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Transfer Limits */}
        <Card className="card-hover dark-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Transfer Limits</CardTitle>
            <CardDescription className="text-slate-400">Your current transfer limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Daily Limit</Label>
                <div className="text-2xl font-bold text-green-400">$5,000</div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Monthly Limit</Label>
                <div className="text-2xl font-bold text-green-400">$50,000</div>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              To increase your limits, please contact our support team.
            </p>
            <Button variant="outline" className="dark:border-slate-700 dark:hover:bg-slate-800">Request Limit Increase</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="card-hover border-red-900">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
            <CardDescription className="text-slate-400">Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-900 rounded-lg bg-slate-800">
              <div>
                <h4 className="font-medium text-red-400">Delete Account</h4>
                <p className="text-sm text-slate-400">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
