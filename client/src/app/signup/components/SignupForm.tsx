"use client";
import axiosClient from "@/constants/axiosClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import Image from "next/image";
import overview from "@/public/overview.png";
import axios from "axios";

interface SignupForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Client-side validation
  const validateForm = () => {
    const { name, username, email, password } = formData;
    if (!name || !username || !email || !password) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axiosClient.post(process.env.NEXT_PUBLIC_BASE_URL + "/user/signup", formData);

      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setError(null);
        const accessToken = response.data?.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setError(errorMessage || "Failed to create account. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(null);
    }
  };

  // Navigate to sign-in
  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full md:mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mx-5">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center">
          <h2 className="font-bold text-2xl md:text-3xl text-black text-center mb-4">
            Create an account with us!
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
              type="submit"
            >
              Sign Up &rarr;
            </button>

            <div className="flex justify-center items-center mt-4 space-x-1">
              <p className="text-sm">Already have an account?</p>
              <button
                className="underline font-semibold text-sm"
                type="button"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8">
          <Image
            src={overview}
            alt="Overview dashboard"
            className="object-cover w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);