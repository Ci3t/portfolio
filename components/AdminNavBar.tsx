"use client";
import React from "react";
import { ProjectsData } from "@/app/admin/layout";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminLogo } from "./ui/AdminLogo";
import { adminLinks } from "@/data/AdminLinks";

export interface AdminSideBarProps {
  projects: ProjectsData[];
}

export function AdminNavBar({ projects }: AdminSideBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  //   const router = useRouter();
  console.log(pathname);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Menu toggle only shows on mobile */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Single NavbarBrand with responsive classes */}
      <NavbarContent className="flex gap-4" justify="center">
        <NavbarBrand className="flex gap-3 max-w-fit">
          <AdminLogo />
          <p className="font-bold text-inherit">Ci3t</p>
        </NavbarBrand>
        {/* Navigation items - hidden on mobile, shown on desktop */}
        <div className="hidden sm:flex items-center gap-4">
          {adminLinks.map((item, index) => (
            <NavbarItem isActive={pathname === item.href}>
              <Link href={item.href} className="flex items-center gap-2 w-full">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {adminLinks.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full flex items-center gap-3"
              color={index === 2 ? "warning" : "foreground"}
              href="#"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
