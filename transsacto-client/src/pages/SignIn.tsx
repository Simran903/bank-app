import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import axiosClient from "@/lib/axiosClient";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/user/signin", formData);

      if (response.status === 200 && response.data.success) {
        const accessToken = response.data?.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        toast.success("Login Successful. Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 transition-colors">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 financial-gradient rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-slate-400">
            Sign in to your Transsacto account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-gray-700 dark:text-slate-200">
                Email/Username
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email or username"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full financial-gradient text-white hover:opacity-90 transition-opacity"
            >
              Sign In
            </Button>

            <p className="text-sm text-center text-gray-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
