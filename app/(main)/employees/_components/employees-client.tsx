"use client";

import React, { useState, useMemo } from "react";
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
import ChangeRoleDialog from "./change-role-dialog";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { Employee } from "@/types/employee";

interface Props {
  employees: Employee[];
  search?: string;
}

export default function EmployeesClient({ employees, search }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [selectedRole, setSelectedRole] = useState<Employee["role"]>("Cashier");
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
          <>
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
                      onClick={() => {
                        setSelected(employee);
                        setSelectedRole(r as Employee["role"]);
                        setOpen(true);
                      }}
                    >
                      Set role: {r}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <ChangeRoleDialog
              open={open}
              onOpenChange={setOpen}
              selected={selected}
              selectedRole={selectedRole}
              onConfirm={() => {
                if (!selected) return;
                // call api for change role here
                toast.success(
                  `${selected.email} role changed to ${selectedRole}`
                );
              }}
              onCancel={() => setSelected(null)}
            />
          </>
        );
      },
    },
  ];

  const q = (search ?? "").trim().toLowerCase();
  const filtered = useMemo(() => {
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
