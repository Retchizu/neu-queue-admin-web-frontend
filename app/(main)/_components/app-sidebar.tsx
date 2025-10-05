"use client";

// Button not needed in this file anymore
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  const user = auth.currentUser;
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
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.photoURL ?? ""}
                      alt={user?.displayName ?? "User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.displayName
                        ? user.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.displayName ?? "User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email ?? ""}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.photoURL ?? ""}
                        alt={user?.displayName ?? "User"}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user?.displayName
                          ? user.displayName
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.displayName ?? "User"}
                      </span>
                      <span className="truncate text-xs">
                        {user?.email ?? ""}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async () => {
                    await auth.signOut();
                    router.replace("/");
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
