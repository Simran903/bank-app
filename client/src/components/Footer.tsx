import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 rounded-tl-[6rem] rounded-tr-[6rem] mt-36">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-extrabold tracking-wide">Transsacto</h1>
          <p className="text-sm text-gray-400 mt-1">Your financial partner</p>
        </div>

        <div className="text-center md:text-right text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Transsacto. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;