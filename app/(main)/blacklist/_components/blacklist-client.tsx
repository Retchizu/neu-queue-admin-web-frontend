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
import type { Blacklist as BlacklistType } from "@/types/blacklist";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Props {
  employees: Employee[];
  search?: string;
  // optional external list and handlers; if not provided the component
  // will manage its own internal list (for backward-compatibility)
  list?: BlacklistType[];
  onRemove?: (email: string) => void;
}

export default function BlacklistClient({
  employees,
  search,
  list: propList,
  onRemove,
}: Props) {
  const [internalList, setInternalList] = React.useState<BlacklistType[]>([]);
  const list = propList ?? internalList;
  const handleRemove = (email: string) => {
    if (onRemove) return onRemove(email);
    setInternalList((s) => s.filter((i) => i.email !== email));
  };

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingEmail, setPendingEmail] = React.useState<string | null>(null);

  function openConfirm(email: string) {
    setPendingEmail(email);
    setConfirmOpen(true);
  }

  function confirmRemove() {
    if (!pendingEmail) return;
    handleRemove(pendingEmail);
    toast.success("Removed from blacklist");
    setConfirmOpen(false);
    setPendingEmail(null);
  }

  const columns: ColumnDef<BlacklistType>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <div className="lowercase">{getValue<string>()}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // For blacklist entries we may not have a name; try to find employee by email
        const email = row.getValue("email") as string;
        const found = employees.find((e) => e.email === email);
        return <div className="font-medium">{found ? found.name : "-"}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const entry = row.original as BlacklistType;

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
              <DropdownMenuItem onClick={() => openConfirm(entry.email)}>
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const q = (search ?? "").trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!q) return list;
    return list.filter((e) => e.email.toLowerCase().includes(q));
  }, [list, q]);

  return (
    <div>
      <Dialog
        open={confirmOpen}
        onOpenChange={(v) => {
          setConfirmOpen(v);
          if (!v) setPendingEmail(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{pendingEmail}</strong>{" "}
              from the blacklist?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setConfirmOpen(false);
                  setPendingEmail(null);
                }}
              >
                No
              </Button>
              <Button onClick={confirmRemove}>Yes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={filtered} />
    </div>
  );
}
