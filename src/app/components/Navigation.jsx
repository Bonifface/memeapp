"use client";

import { Navbar, Link, NavbarContent, NavbarItem } from "@heroui/react";

export default function Navigation() {
  return (
    <Navbar className="p-0 m-0 justify-start items-center">
      <NavbarContent className="flex gap-8 ">
        <NavbarItem>
          <Link className="text-xl" color="foreground" href="/table">
            Table
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-xl" color="foreground" href="/list">
            List
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
