"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h3>NQueue</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Link href={"/employees"}>
              <SidebarMenuButton>
                <p className="font-medium">Employees</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/station"}>
              <SidebarMenuButton>
                <p className="font-medium">Stations</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/pending"}>
              <SidebarMenuButton>
                <p className="font-medium">Pending Accounts</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/blacklist"}>
              <SidebarMenuButton>
                <p className="font-medium">Blacklisted</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/logs"}>
              <SidebarMenuButton>
                <p className="font-medium">Activity Logs</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/analytics"}>
              <SidebarMenuButton>
                <p className="font-medium">Analytics</p>
              </SidebarMenuButton>
            </Link>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton>
            <Button
              onClick={async () => {
                await auth.signOut();
                localStorage.removeItem("token");
                router.replace("/");
              }}
            >
              Logout
            </Button>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
