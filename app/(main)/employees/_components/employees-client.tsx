"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "./data-table";
import { Employee } from "@/types/employee";

interface Props {
  employees: Employee[];
  search?: string;
}

export default function EmployeesClient({ employees, search }: Props) {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <div className="font-medium">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <div className="lowercase">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ getValue }) => (
        <div className="text-sm text-muted-foreground">
          {new Date(getValue<string>()).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employee = row.original;
        const roles = ["Admin", "Cashier", "Information"];

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {roles.map((r) =>
                r === employee.role ? null : (
                  <DropdownMenuItem
                    key={r}
                    onClick={() => console.log("set-role", employee.id, r)}
                  >
                    Set role: {r}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const q = (search ?? "").trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return employees;
    return employees.filter((e) =>
      [e.name, e.email, e.role].some((field) => field.toLowerCase().includes(q))
    );
  }, [employees, q]);

  return (
    <div>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
