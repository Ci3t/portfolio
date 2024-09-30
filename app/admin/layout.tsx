import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { AdminSideBar } from "./AdminSideBar";

const inter = Inter({ subsets: ["latin"] });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

import { getProjects } from "@/lib/action";
import { AdminNavBar } from "@/components/AdminNavBar";

// Define the ProjectsData interface
export interface ProjectsData {
  _id: number;
  title: string;
  des: string;
  imgUrl: string;
  img_url: string;
  img_id: string;
  iconLists: string[];
  createdAt: Date;
  updatedAt: Date;
}
export const metadata: Metadata = {
  title: "RaNi's Portfolio Admin Page",
  description: "Fullstack Developer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role;

  if (role !== "admin") {
    redirect("/");
    return;
  }

  const projects: ProjectsData[] = await getProjects();
  return (
    <html suppressHydrationWarning lang="en" className="dark">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="portfolio theme"
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            {/* <AdminSideBar projects={projects || []} /> */}
            <AdminNavBar projects={projects || []} />
            <main className="flex-1 p-4 mt-15">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
