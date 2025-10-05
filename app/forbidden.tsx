"use client";

import Image from "next/image";
import neuLogo from "@/public/neu-logo.png";

export default function ForbiddenPage() {
  return (
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

      <p className="text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} NEUQueue
      </p>
    </div>
  );
}
