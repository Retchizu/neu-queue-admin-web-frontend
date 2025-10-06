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
import { DataTable } from "../../employees/_components/data-table";
import { Employee } from "@/types/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
// ...existing code...

interface Props {
  employees: Employee[];
  search?: string;
  onAccept?: (id: string, role: Employee["role"]) => void;
}

export default function PendingClient({ employees, search, onAccept }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Employee | null>(null);
  const [selectedRole, setSelectedRole] =
    React.useState<Employee["role"]>("Cashier");

  const columns: ColumnDef<Employee>[] = React.useMemo(
    () => [
      {
        accessorKey: "displayName",
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
        id: "actions",
        cell: ({ row }) => {
          const employee = row.original;

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
                  <DropdownMenuItem
                    onClick={() => {
                      setSelected(employee);
                      setSelectedRole(employee.role);
                      setOpen(true);
                    }}
                  >
                    Accept user
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    []
  );

  const q = (search ?? "").trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return employees;
    return employees.filter((e) =>
      [e.displayName, e.email, e.role].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [employees, q]);

  function handleAccept() {
    if (!selected) return;
    if (onAccept) onAccept(selected.uid, selectedRole);
    setOpen(false);
  }

  return (
    <div>
      <DataTable columns={columns} data={filtered} />

      <Dialog open={open && !!selected} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept user</DialogTitle>
            <DialogDescription>
              Are you sure you want to accept this user?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2 py-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Role</label>
              <select
                className="rounded-md border px-2 py-1"
                value={selectedRole}
                onChange={(e) =>
                  setSelectedRole(e.target.value as Employee["role"])
                }
              >
                <option value="Admin">Admin</option>
                <option value="Cashier">Cashier</option>
                <option value="Information">Information</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAccept}>Accept</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
