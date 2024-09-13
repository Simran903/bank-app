"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            item="Home"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
        <Link href={"/services"}>
          <MenuItem item="Services" setActive={setActive} active={active}>
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
        </Link>
        <Link href={"/contact"}>
          <MenuItem
            item="Contact Us"
            setActive={setActive}
            active={active}
          ></MenuItem>
        </Link>
        <Link href={"/login"}>
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
