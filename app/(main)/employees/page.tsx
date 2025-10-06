"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types/employee";
import React, { useEffect, useState } from "react";
import EmployeesClient from "./_components/employees-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError, AxiosError } from "axios";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/admin/employees");
      // normalize incoming employee objects to the canonical Employee shape
      const raw = (response.data.employees ?? []) as unknown[];
      const employeesFromApi: Employee[] = raw.map((item) => {
        const u = item as Record<string, unknown>;
        const getStr = (k: string) =>
          typeof u[k] === "string" ? (u[k] as string) : "";

        const roleRaw = getStr("role");
        const role =
          roleRaw.length > 0
            ? roleRaw.charAt(0).toUpperCase() + roleRaw.slice(1).toLowerCase()
            : "";

        return {
          uid: getStr("uid") || getStr("id"),
          displayName: getStr("displayName") || getStr("name"),
          email: getStr("email"),
          role,
          createdAt: getStr("createdAt"),
        } as Employee;
      });
      setEmployees(employeesFromApi);
      if (response.data?.message) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const respData: any = axiosErr.response?.data;
        const message =
          respData?.message ?? String(axiosErr.message ?? axiosErr);
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();

    const getCurrentUser = async () => {
      try {
        const resp = await api.get("/user/verify");
        const role = resp.data?.user?.role ?? null;
        setCurrentUserRole(role);
      } catch (err) {
        // ignore - verification handled elsewhere; keep role null
        console.error("Failed to fetch current user role", err);
      }
    };
    getCurrentUser();
  }, []);
  console.log(employees);

  /* const employees: Employee[] = React.useMemo(() => {
    const roles: Employee["role"][] = ["Admin", "Cashier", "Information"];
    const firstNames = [
      "Kenji",
      "Abe",
      "Monserrat",
      "Silas",
      "Carmella",
      "Lina",
      "Rico",
      "Nadia",
      "Oscar",
      "Bea",
      "Hector",
      "Maya",
    ];
    const lastNames = [
      "Nakamura",
      "Johnson",
      "Diaz",
      "Bennett",
      "Ruiz",
      "Lopez",
      "Garcia",
      "Santos",
      "Reyes",
      "Tan",
      "Cruz",
      "Delgado",
    ];

    const count = 50;
    const now = Date.now();

    return Array.from({ length: count }).map((_, i) => {
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const name = `${fn} ${ln}`;
      const id = `e_${String(i + 1).padStart(3, "0")}`;
      const role = roles[i % roles.length];
      const createdAt = new Date(now - i * 1000 * 60 * 60 * 24).toISOString();
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@neu.edu.ph`;

      return {
        id,
        name,
        email,
        role,
        createdAt,
      } as Employee;
    });
  }, []);
 */
  const [search, setSearch] = useState("");

  return (
    <Card className="h-full w-full border border-[var(--primary)]">
      <CardHeader>
        <CardTitle>Employee Management</CardTitle>
        <CardDescription>
          Assign roles to each users for the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for employees..."
            className="flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1 min-h-0">
          <EmployeesClient
            employees={employees}
            search={search}
            currentUserRole={currentUserRole}
            onRoleChanged={fetchEmployees}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
