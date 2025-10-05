"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type Cashier from "@/types/cashier";

type Props = {
  employees: Cashier[];
  onAddCounter: (employeeId: string | null) => void;
};

const AddCounterDialog = ({ employees, onAddCounter }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Add Counter</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add counter</DialogTitle>
          <DialogDescription>
            Add a new counter and optionally assign a cashier.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <label className="block mb-2">Assign cashier (optional)</label>
          <select
            className="w-full rounded border px-2 py-1"
            value={employeeId ?? ""}
            onChange={(e) => setEmployeeId(e.target.value || null)}
          >
            <option value="">None</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.type})
              </option>
            ))}
          </select>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onAddCounter(employeeId);
                setOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCounterDialog;
