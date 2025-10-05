"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import neuLogo from "@/public/neu-logo.png";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "403 – Forbidden",
  description: "You do not have permission to access this page.",
};

const ForbiddenPage = () => {
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
            403 – Forbidden
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            You don’t have permission to access this page. <br />
            Please contact your administrator if you believe this is a mistake.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="no-underline">
              <Button className="px-6 py-2 rounded-xl bg-primary text-white hover:opacity-90">
                Go Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} NEUQueue
          </p>
        </div>
      </body>
    </html>
  );
};

export default ForbiddenPage;
