import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../@/components/ui/navigation-menu";
import { motion } from "framer-motion";

const buttonClass = "text-[#CCD0CF] border-2 border-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer";

const motionProps = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};

const NavButton: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.button {...motionProps}>
    <NavigationMenuItem className={buttonClass}>
      {children}
    </NavigationMenuItem>
  </motion.button>
);

const navItems = ["Home", "About us", "Services"];

const Navbar: React.FC = () => {
  return (
    <nav className="h-14 text-[#fef9c3] flex justify-between items-center my-2 mx-8">
      <div className="logo">
        <h1 className={buttonClass}>logo</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          {navItems.map((item) => (
            <NavButton key={item}>{item}</NavButton>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2">
        {["Sign in", "Sign up"].map((text) => (
          <motion.button
            key={text}
            className={buttonClass}
            {...motionProps}
          >
            {text}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;