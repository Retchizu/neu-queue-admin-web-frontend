"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import neuLogo from "@/public/neu-logo.png";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global Error:", error);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <Image
            src={neuLogo}
            alt="neu-logo"
            className="h-40 w-40 mb-8 select-none"
            priority
          />
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            500 – Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            We’re sorry, but something unexpected happened. <br />
            Our team has been notified. Please try again later.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => reset()}
              className="px-6 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              Try Again
            </Button>

            <Link href="/" className="no-underline">
              <Button className="px-6 py-2 rounded-xl bg-primary text-white hover:opacity-90">
                Go Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} New Era University Queue System
          </p>
        </div>
      </body>
    </html>
  );
}
