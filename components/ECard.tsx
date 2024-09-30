import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/EverVaultCard";
import { AdminSideBarProps } from "@/app/admin/AdminSideBar";
import Image from "next/image";

export function ECard({ projects }: AdminSideBarProps) {
  return (
    <div className="mt-3 flex flex-col items-center w-[40vw]">
      {projects?.map((p, i) => (
        <div
          key={i}
          className="border border-black/[0.2] dark:border-white/[0.2] rounded-xl relative h-[4rem] w-[40vw] px-2 mb-4" // Ensure each project is inside its own container
        >
          {/* Repeat the icons for each project */}
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard>
            <div>
              <Image
                src={p.img_url || p.imgUrl}
                alt={p.title}
                width={50}
                height={50}
              />
            </div>
            <div>
              <h1>{p.title}</h1>
              <p>{p.des}</p>
            </div>
          </EvervaultCard>
        </div>
      ))}
    </div>
  );
}
