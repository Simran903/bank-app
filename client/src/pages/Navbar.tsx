import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../@/components/ui/navigation-menu";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="h-14 text-[#fef9c3] flex justify-between items-center my-2 mx-8">
      <div className="logo">
        <h1 className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
          logo
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                Home
              </NavigationMenuItem>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                About us
              </NavigationMenuItem>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                Services
              </NavigationMenuItem>
            </motion.button>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-2">
        <motion.button
          className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign in
        </motion.button>
        <motion.button
          className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign up
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
