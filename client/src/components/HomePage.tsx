import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="vast-shadow-regular text-center space-y-8">
        {/* First row */}
        <div className="flex justify-center items-center space-x-4">
          <span className="text-6xl lg:text-8xl font-extrabold">
            Simplifying
          </span>
          <span className="text-6xl lg:text-8xl font-extrabold">
            Banking
          </span>
          <video
            autoPlay
            loop
            muted
            playsInline
            width="170px"
            className="grayscale rounded-lg"
            src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4"
            preload="metadata"
          />
        </div>

        {/* Second row */}
        <div className="flex justify-center items-center space-x-4">
        <video
            autoPlay
            loop
            muted
            playsInline
            width="190px"
            className="grayscale rounded-lg"
            src="https://videos.pexels.com/video-files/7579959/uhd_25fps.mp4"
            preload="metadata"
          />
          <span className="text-6xl lg:text-8xl font-extrabold">for the</span>
          <video
            autoPlay
            loop
            muted
            playsInline
            width="170px"
            className="grayscale rounded-lg"
            src="https://videos.pexels.com/video-files/5699999/5699999-uhd_2560_1440_24fps.mp4"
            preload="metadata"
          />
        </div>

        {/* Third row */}
        <div className="flex justify-center items-center space-x-4">
          <span className="text-6xl lg:text-8xl font-extrabold">Modern</span>
          <video
            autoPlay
            loop
            muted
            playsInline
            width="190px"
            className="grayscale rounded-lg"
            src="https://videos.pexels.com/video-files/7567651/7567651-hd_1920_1080_25fps.mp4"
            preload="metadata"
          />
          <span className="text-6xl lg:text-8xl font-extrabold">World</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;