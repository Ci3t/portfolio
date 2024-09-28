import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import AdminNav from "./AdminNav";
import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { AdminSideBar } from "./AdminSideBar";

const inter = Inter({ subsets: ["latin"] });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AdminNav user={user} /> */}

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
