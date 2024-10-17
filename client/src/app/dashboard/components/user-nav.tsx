"use client";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { baseUrl } from "@/constants";
import axios from "axios"; // Make sure axios is installed and imported
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserNav() {
  const router = useRouter(); // To handle routing
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl+ "/user/signout", {}, { // Adjust the base URL if needed
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure cookies or tokens are sent (if applicable)
      });

      // On success, redirect the user to the homepage
      router.push("/");
    } catch (err) {
      setError("Failed to log out. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full text-white">
          <Avatar className="h-8 w-8">
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">shadcn</p>
            <p className="text-xs leading-none text-muted-foreground">
              m@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if logout fails */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}