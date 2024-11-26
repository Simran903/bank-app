import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 mt-[20rem] md:mt-36 rounded-tl-full rounded-tr-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        <h1 className="text-lg md:text-xl font-bold text-center md:text-left">Transsacto</h1>

        <p className="text-xs md:text-sm text-center">
          &copy; {new Date().getFullYear()} Transsacto. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
