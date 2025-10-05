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
    <Sidebar>
      <SidebarHeader>
        <h3>NQueue</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Link href={"/employees"}>
              <SidebarMenuButton>
                <p className="font-medium">Manage Employees</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/station"}>
              <SidebarMenuButton>
                <p className="font-medium">Manage Stations</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/logs"}>
              <SidebarMenuButton>
                <p className="font-medium">View Logs</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/pending"}>
              <SidebarMenuButton>
                <p className="font-medium">Review Pending Accounts</p>
              </SidebarMenuButton>
            </Link>
            <Link href={"/analytics"}>
              <SidebarMenuButton>
                <p className="font-medium">View Analytics</p>
              </SidebarMenuButton>
            </Link>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
