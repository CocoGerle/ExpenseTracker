"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/components/utils/context";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserContextProvider>
        <body className={inter.className}>{children}</body>
      </UserContextProvider>
    </html>
  );
}
