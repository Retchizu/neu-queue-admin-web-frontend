import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider open={true}>
      <AppSidebar />
      <main className="w-full h-svh overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 pr-2 py-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
