"use client"
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = (): void => {
    router.push('/signup');
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 md:px-8 bg-image md:bg-none">
      <div className="vast-shadow-regular text-center space-y-2 md:space-y-8 w-full md:w-auto">
        <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <span className="text-7xl lg:text-6xl xl:text-8xl font-extrabold">
            Simplifying
          </span>
          <span className="text-7xl lg:text-6xl xl:text-8xl font-extrabold">
            Banking
          </span>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block grayscale rounded-lg w-32 md:w-40 lg:w-44 xl:w-48"
            src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4"
            preload="metadata"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 space-y-0 md:space-y-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block grayscale rounded-lg w-36 md:w-44 lg:w-48"
            src="https://videos.pexels.com/video-files/7579959/uhd_25fps.mp4"
            preload="metadata"
          />
          <span className="text-7xl lg:text-6xl xl:text-8xl font-extrabold">for the</span>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block grayscale rounded-lg w-32 md:w-40 lg:w-44 xl:w-48"
            src="https://videos.pexels.com/video-files/5699999/5699999-uhd_2560_1440_24fps.mp4"
            preload="metadata"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <span className="text-7xl lg:text-6xl xl:text-8xl font-extrabold">Modern</span>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block grayscale rounded-lg w-36 md:w-44 lg:w-48"
            src="https://videos.pexels.com/video-files/7567651/7567651-hd_1920_1080_25fps.mp4"
            preload="metadata"
          />
          <span className="text-7xl lg:text-6xl xl:text-8xl font-extrabold">World</span>
        </div>
        <Button onClick={handleSignIn} className="bg-black text-white hover:bg-zinc-900 text-lg border border-double border-amber-500">Create an account with us!</Button>
      </div>
    </div>
  );
};

export default HomePage;
