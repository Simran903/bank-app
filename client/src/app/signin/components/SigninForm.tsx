"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import Image from "next/image";
import overview from "@/public/overview.png";
import axiosClient from "@/constants/axiosClient";
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="w-full h-full max-w-none flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 h-full p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h2 className="font-bold text-2xl md:text-3xl text-white/80 text-center mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-center mb-8">Sign in to your account to continue</p>

            {error && (
              <div className="bg-gray-100 border-l-4 border-black p-4 mb-6 rounded-md">
                <p className="text-gray-900 text-sm">{error}</p>
              </div>
            )}

            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">Email or Username</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiUser />
                  </div>
                  <Input
                    id="identifier"
                    type="text"
                    name="identifier"
                    placeholder="Enter your email or username"
                    value={formData.identifier}
                    required
                    onChange={handleChange}
                    className="pl-10 py-2 text-white border-gray-200 focus:border-black focus:ring focus:ring-gray-200 focus:ring-opacity-50 rounded-lg transition-all duration-200"
                  />
                </div>
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <a href="#" className="text-xs text-gray-700 hover:text-black transition-colors duration-200">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FiLock />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    className="pl-10 py-2 text-white border-gray-200 focus:border-black focus:ring focus:ring-gray-200 focus:ring-opacity-50 rounded-lg transition-all duration-200"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </LabelInputContainer>

              <button
                className={cn(
                  "relative group flex items-center justify-center w-full text-white rounded-lg h-12 font-medium shadow-md bg-gray-900 transition-all duration-300",
                  loading && "opacity-80 cursor-not-allowed"
                )}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span>Sign in</span>
                    <FiArrowRight className="ml-2" />
                  </>
                )}
                <BottomGradient />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <a href="/signup" className="text-gray-700 font-medium transition-colors duration-200">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2 h-full relative bg-black">
          <Image
            src={overview}
            alt="Overview Dashboard"
            className="object-cover h-full w-full opacity-70 mix-blend-luminosity"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="text-center text-white p-8 max-w-md">
              <div className="mb-6 inline-block">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h3>
              <p className="text-lg opacity-90 mb-8">Access all your analytics and insights in one powerful interface.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-0.5 w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-white to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-0.5 w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
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