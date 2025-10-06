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
  list?: BlacklistType[];
  onRemove?: (email: string) => Promise<void> | void;
  loading?: boolean;
}

export default function BlacklistClient({
  employees,
  search,
  list: propList,
  onRemove,
  loading,
}: Props) {
  const [internalList, setInternalList] = React.useState<BlacklistType[]>([]);
  const list = propList ?? internalList;
  const handleRemove = async (email: string) => {
    if (onRemove) return await onRemove(email);
    setInternalList((s) => s.filter((i) => i.email !== email));
  };

  const [removing, setRemoving] = React.useState(false);

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingEmail, setPendingEmail] = React.useState<string | null>(null);

  function openConfirm(email: string) {
    setPendingEmail(email);
    setConfirmOpen(true);
  }

  async function confirmRemove() {
    if (!pendingEmail) return;
    try {
      setRemoving(true);
      await handleRemove(pendingEmail);
      toast.success("Removed from blacklist");
      setConfirmOpen(false);
      setPendingEmail(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from blacklist");
    } finally {
      setRemoving(false);
    }
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
        const email = row.getValue("email") as string;
        const found = employees.find((e) => e.email === email);
        return (
          <div className="font-medium">{found ? found.displayName : "-"}</div>
        );
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
              <Button onClick={confirmRemove} disabled={removing}>
                {removing ? "Removing..." : "Yes"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={filtered} isLoading={loading} />
    </div>
  );
}
