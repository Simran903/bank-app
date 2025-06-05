
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axiosClient from "axios";
import { toast } from "sonner";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in form submitted:", formData);

    try{
      const response = await axiosClient.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/signin",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.success) {
        const accessToken = response.data?.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        <Navigate to="/dashboard" />
        setTimeout(() => {
          toast("Login Successfull.", {
            description: "Redirecting to dashboard...",
            duration: 1000,
          });
        }, 1000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 financial-gradient rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-100">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">Sign in to your Transsacto account</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-200">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:ring-blue-500"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-500 text-white hover:opacity-90 transition-opacity">
              Sign In
            </Button>
            
            <p className="text-sm text-center text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
