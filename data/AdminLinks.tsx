// navLinks.tsx
import React from "react";
import {
  IconSettings,
  IconBrandTabler,
  IconUserBolt,
  IconArrowLeft,
} from "@tabler/icons-react";
import Image from "next/image";

export const adminLinks = [
  {
    label: "Projects",
    href: "/admin/projects",
    subTitle: "View Projects",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Add Project",
    href: "/admin/addproject",
    icon: (
      <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Homepage",
    href: "/",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const profileLink = {
  label: "Manu Arora",
  href: "#",
  icon: (
    <Image
      src="/profile.svg"
      className="h-7 w-7 flex-shrink-0 rounded-full"
      width={50}
      height={50}
      alt="Avatar"
    />
  ),
};
