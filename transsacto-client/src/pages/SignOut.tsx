import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import axiosClient from "@/lib/axiosClient";
import { toast } from "sonner";

export default function SignOut() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await axiosClient.post("/user/signout", {});

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      sessionStorage.clear();

      toast.success("Signed out successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
            <span className="text-red-600 dark:text-red-400 font-bold text-lg">!</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Sign Out
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-slate-400">
            Are you sure you want to sign out? You'll need to sign in again to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent />

        <CardFooter className="flex gap-3">
          <Button
            onClick={handleCancel}
            variant="soft"
            className="flex-1 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="flex-1 bg-red-500 hover:bg-red-600 text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Signing out..." : "Sign Out"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}