"use client";
import { baseUrl } from "../../../constants/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import Image from "next/image";
import overview from "@/public/overview.png";
import axiosClient from "@/constants/axiosClient";

interface SigninForm {
  identifier: string;
  password: string;
}

const SigninForm = () => {
  const [formData, setFormData] = useState<SigninForm>({
    identifier: "",
    password: "",
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosClient.post(baseUrl + "/user/signin", formData, {withCredentials: true,})

      if (response.status === 200 && response.data.success) {

        const accessToken = response.data?.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
    <div className="max-w-6xl w-full mx-auto flex bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12">
        <h2 className="font-bold text-2xl text-black">Sign in</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input
              id="identifier"
              placeholder="johndoe@mail.com or username"
              type="text"
              name="identifier"
              value={formData.identifier}
              required
              onChange={handleChange}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="********"
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
            Sign in &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>

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

export default SigninForm;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
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
