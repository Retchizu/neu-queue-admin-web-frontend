"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, Building } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const StationSidebar = () => {
  return (
    <Sidebar side="right" variant="floating">
      {/* Header */}
      <SidebarHeader>
        <div className="p-4">
          <Button className="w-full">Add Station</Button>
        </div>
      </SidebarHeader>

      <SidebarContent></SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Building /> Select station
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="center"
                className="w-full min-w-full"
              >
                {/* Put all the station here */}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default StationSidebar;
