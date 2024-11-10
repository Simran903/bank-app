import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 mt-60 md:mt-0 rounded-tl-full rounded-tr-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        <h1 className="text-lg md:text-xl font-bold text-center md:text-left">BANK-APP</h1>

        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 text-sm md:text-base">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">FAQs</a>
          <a href="#" className="hover:underline">Login</a>
        </nav>

        <p className="text-xs md:text-sm text-center">&copy; {new Date().getFullYear()} Bank-App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
