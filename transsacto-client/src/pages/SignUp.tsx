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
import axiosClient from "@/lib/axiosClient";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.username || !formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const cleanFormData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      };

      const response = await axiosClient.post("/user/signup", cleanFormData);

      if (response.status === 201 || response.data.success) {
        toast.success("Signup successful! Redirecting to dashboard...");

        if (response.data.token || response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.token || response.data.accessToken);
        }

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error("Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 financial-gradient rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Create account
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-slate-400">
            Join Transsacto today
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-slate-200">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-slate-200">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full financial-gradient text-white hover:opacity-90 transition-opacity">
              Create Account
            </Button>
            <p className="text-sm text-center text-gray-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}