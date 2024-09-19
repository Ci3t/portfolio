import type { Metadata } from "next";
// import localFont from "next/font/local";
import {Inter} from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({subsets:["latin"]})
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "RaNi's Portfolio",
  description: "Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} `}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
       
      </body>
    </html>
  );
}
