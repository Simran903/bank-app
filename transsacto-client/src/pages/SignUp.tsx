
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axiosClient from "axios";
import { toast } from "sonner";


export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const { fullName, username, password, confirmPassword } = formData;
    if (!fullName || !username || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }


    try{
      const response = await axiosClient.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/signup",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.success) {
        toast.success("Sign up successful.");
        setTimeout(() => {
          toast("Redirecting to dashboard...", {
            duration: 1000,
          });
        }, 1000);
        <Navigate to="/dashboard" />
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 financial-gradient rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-100">Create account</CardTitle>
          <CardDescription className="text-slate-400">Join Transsacto today</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-200">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-200">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-500 text-white hover:opacity-90 transition-opacity">
              Create Account
            </Button>
            
            <p className="text-sm text-center text-slate-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
