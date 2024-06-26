import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <div className="h-14 text-[#fef9c3] flex justify-between items-center my-2 mx-8">
      <div className="logo">
        <h1 className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">logo</h1>
      </div>
      <div className="flex justify-center items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 text-center me-2 mb-2 cursor-pointer">
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 text-center me-2 mb-2 cursor-pointer">
            <NavigationMenuTrigger>About us</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 text-center me-2 mb-2 cursor-pointer">
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
      <div className="">
        <button className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
          Sign in
        </button>
        <button className="text-gray-900 bg-[#CCD0CF] hover:opacity-90 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
