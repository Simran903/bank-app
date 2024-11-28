"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import Image from "next/image";
import overview from "@/public/overview.png";
import axiosClient from "@/constants/axiosClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface SigninForm {
  identifier: string;
  password: string;
}

const SigninForm = () => {
  const [formData, setFormData] = useState<SigninForm>({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosClient.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/signin",
        formData,
        { withCredentials: true }
      );

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
    <div className="min-h-screen bg-black flex items-center justify-center py-4 sm:p-8">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12">
          <h2 className="font-bold text-2xl md:text-3xl text-black text-center mb-4">Sign in</h2>
          {error && <p className="text-red-500 mt-2 mb-4">{error}</p>}

          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                type="text"
                name="identifier"
                value={formData.identifier}
                required
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
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
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-8">
          <Image
            src={overview}
            alt="Overview Dashboard"
            className="object-cover h-full w-full rounded-r-2xl"
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
