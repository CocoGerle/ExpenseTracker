"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { RecordContextProvider } from "@/components/utils/context";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/utils/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <RecordContextProvider>
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </RecordContextProvider>
      </AuthProvider>
    </html>
  );
}
