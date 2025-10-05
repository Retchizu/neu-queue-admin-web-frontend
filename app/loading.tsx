"use client";

import "./globals.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import neuLogo from "@/public/neu-logo.png";

const inter = Inter({ subsets: ["latin"] });

const Loading = () => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <Image
            src={neuLogo}
            alt="neu-logo"
            className="h-40 w-40 mb-8 select-none"
            priority
          />

          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Loading...
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            Please wait while we direct you to your destination.
          </p>

          <div className="flex justify-center mb-8">
            <svg
              className="w-12 h-12 text-primary animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>

          <p className="text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} NEUQueue
          </p>
        </div>
      </body>
    </html>
  );
};

export default Loading;
