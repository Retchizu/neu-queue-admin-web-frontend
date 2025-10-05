import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
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
            <p className="font-medium">Logout</p>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
