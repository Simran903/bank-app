"use client";
import axios from "axios";
import {baseUrl} from "../../../constants/index"
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";

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
      const response = await axios.post(baseUrl + "/user/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setError("");
      }

      const data = response.data;

      setSuccess("Account created successfully!");
      setError(null);
    } catch (error) {
      setError("Failed to create account. Please try again.");
      setSuccess("");
    }
  };

  const handleSignIn = () => {
    router.push("/signin"); // Navigate to the /signin page when "Sign in" button is clicked
  };

  return (
    <div className="h-screen bg-black pt-60" >
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-stone-200 bg-black">
        <h2 className="font-bold text-2xl text-black">
          Create an account with us!
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Full name</Label>
              <Input
                id="fullname"
                placeholder="Tyler"
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
                placeholder="Tyler/"
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
            onClick={handleSubmit}
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <button
            className="mt-4 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="button" // Change this to "button" to prevent form submission
            onClick={handleSignIn} // Call the handleSignIn function on click
          >
            Sign in &rarr;
            <BottomGradient />
          </button>
        </form>
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
