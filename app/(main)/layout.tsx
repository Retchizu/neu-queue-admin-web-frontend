import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/app/(main)/_components/app-sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider open={true}>
      <AppSidebar />
      <main className="w-full h-svh overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
