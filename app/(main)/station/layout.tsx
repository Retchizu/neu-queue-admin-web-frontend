import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import StationSidebar from "./_components/station-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <main className="w-full h-svh overflow-hidden flex flex-col">
        <div className="flex-1 min-h-0 ">{children}</div>
      </main>

      <StationSidebar />
    </SidebarProvider>
  );
};

export default Layout;
