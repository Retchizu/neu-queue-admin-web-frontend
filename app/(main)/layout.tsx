"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/app/(main)/_components/app-sidebar";
import { useVerifyUser } from "@/hooks/useVerifyUser";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useVerifyUser();

  console.log("isLoading", isLoading)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Loading...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-center">
          Please wait while we direct you to the next page.
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider open={true}>
      <AppSidebar />
      <main className="w-full h-screen overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 p-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
