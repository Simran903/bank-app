import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const buttonClass = "text-[#CCD0CF] border-2 border-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer";

const motionProps = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};

const ScrollButton: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <motion.div {...motionProps}>
    <NavigationMenuItem>
      <button
        className={buttonClass}
        onClick={() => {
          const element = document.getElementById(to);
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {children}
      </button>
    </NavigationMenuItem>
  </motion.div>
);

const navItems = [
  { name: "Home", to: "home" },
  { name: "About us", to: "about" },
  { name: "Services", to: "services" }
];

const Navbar: React.FC = () => {
  return (
    <nav className="h-14 text-[#fef9c3] flex justify-between items-center my-2 mx-8">
      <div className="logo">
        <button
          className={buttonClass}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          logo
        </button>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          {navItems.map((item) => (
            <ScrollButton key={item.name} to={item.to}>{item.name}</ScrollButton>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2">
        {["Sign in", "Sign up"].map((text) => (
          <Link key={text} to={`/${text.toLowerCase().replace(" ", "")}`}>
            <motion.button
              className={buttonClass}
              {...motionProps}
            >
              {text}
            </motion.button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
