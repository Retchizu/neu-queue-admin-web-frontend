"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import neuLogo from "@/public/neu-logo.png";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const GlobalNotFound = () => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Logo */}
          <Image
            src={neuLogo}
            alt="neu-logo"
            className="h-40 w-40 mb-8 select-none"
            priority
          />

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            404 – Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="no-underline">
              <Button className="px-6 py-2 rounded-xl bg-primary text-white hover:opacity-90">
                Go Home
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} New Era University Queue System
          </p>
        </div>
      </body>
    </html>
  );
};

export default GlobalNotFound;
