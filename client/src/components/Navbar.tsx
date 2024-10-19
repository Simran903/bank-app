"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 scroll-smooth", className)}
    >
      <Menu setActive={setActive}>
        <Link href="#home">
          <MenuItem
            item="Home"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
        <Link href="#features">
          <MenuItem
            item="Features"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
        <Link href="#accordion">
          <MenuItem
            item="FAQs"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
        <Link href={"/signup"}>
          <MenuItem
            item="Login"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
