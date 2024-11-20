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
      const response = await axiosClient.post(baseUrl + "/user/signin", formData, { withCredentials: true });

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
    <div className="h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
          <h2 className="font-bold text-xl sm:text-2xl text-black">Sign in</h2>
          {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

          <form className="my-6" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                placeholder="Enter your email or username"
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
              className="bg-gradient-to-br relative group from-black to-neutral-600 w-full text-white rounded-md h-10 font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
              type="submit"
            >
              Sign in &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex md:w-1/2 justify-end items-center bg-gray-100">
          <Image
            src={overview}
            alt="Overview Dashboard"
            className="object-cover h-full w-full rounded-r-lg"
            priority
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
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
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
