"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = (): void => {
    router.push("/signup");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-fixed bg-center bg-cover grayscale blur-md"
          style={{
            backgroundImage:
              'url("https://i.pinimg.com/736x/ed/56/dc/ed56dcb806758db908121d76697d9655.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-6 text-white">
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-2">
            Financial Freedom
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Manage your money with ease
          </h1>
          <p className="text-lg max-w-xl mx-auto text-white/80">
            Smart budgeting, seamless transactions, and personalized insights to help you take control of your finances.
          </p>
          <div className="pt-4 flex justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-white text-black hover:bg-white/90 font-medium px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;