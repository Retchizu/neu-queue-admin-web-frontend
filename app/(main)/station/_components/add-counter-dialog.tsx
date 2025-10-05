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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  employees: Cashier[];
  onAddCounter: (employeeId: string | null) => void;
};

// Assumption: "cashier" role maps to Cashier.type === "payment" — adjust if needed.
const AddCounterDialog = ({ employees, onAddCounter }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState<string | null>(null);

  const available = employees.filter((e) => e.type === "payment");

  const handleSelectEmployee = (id: string | null) => setEmployeeId(id);

  const handleCancel = () => setOpen(false);

  const handleCreate = () => {
    onAddCounter(employeeId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Add Counter</Button>
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {employeeId
                  ? employees.find((e) => e.id === employeeId)?.name
                  : "Select cashier (optional)"}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-72 p-0">
              <ScrollArea className="max-h-48 p-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-1">
                    <button
                      className="text-sm text-muted-foreground"
                      onClick={() => handleSelectEmployee(null)}
                    >
                      None
                    </button>
                  </div>
                  {available.map((emp) => (
                    <div
                      key={emp.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span>{emp.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {emp.type}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSelectEmployee(emp.id)}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Counter</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCounterDialog;
