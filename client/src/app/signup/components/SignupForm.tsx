"use client";
import axiosClient from "@/constants/axiosClient";
import axios from "axios";
import { baseUrl } from "../../../constants/index";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import Image from "next/image";
import overview from "@/public/overview.png";

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

  const router = useRouter(); // Use the router hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post(baseUrl + "/user/signin", formData, {})

      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setError(null);
        const accessToken = response.data?.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;

        if (errorMessage === "Email already exists") {
          setError("This email is already in use. Please try another.");
        } else if (errorMessage === "Username already taken") {
          setError("This username is already taken. Please choose another.");
        } else {
          setError(errorMessage || "Failed to create account. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setSuccess(null);
    }
  };

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="h-screen bg-black py-24 flex items-center justify-center">
      {/* Left Side: Form */}
      <div className="max-w-6xl w-full mx-auto flex bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="font-bold text-2xl text-black">
            Create an account with us!
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
              <LabelInputContainer>
                <Label htmlFor="fullname">Full name</Label>
                <Input
                  id="fullname"
                  placeholder="Tyler Smith"
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
                  placeholder="Tyler001"
                  type="text"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                />
              </LabelInputContainer>
            </div>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            <div className="flex justify-center items-center mt-4 space-x-1">
              <p className="text-sm">Already have an account?</p>
              <button
                className="underline font-semibold"
                type="button"
                onClick={handleSignIn}
              >
                Sign in
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex w-1/2 justify-end items-center">
          <Image
            src={overview}
            alt="overview dashboard"
            className="object-cover h-full w-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
