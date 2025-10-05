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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Employee } from "@/types/employee";
import type Counter from "@/types/counter";

type Props = {
  stationId: string;
  employees: Employee[];
  availableEmployees: Employee[];
  onAddCounter: (stationId: string, newCounter: Partial<Counter>) => Promise<void>;
};

const AddCounterDialog = ({
  employees,
  availableEmployees,
  onAddCounter,
  stationId,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState<string | null>(null);
  const [counterNumber, setCounterNumber] = React.useState<number>(0);

  const handleCancel = () => setOpen(false);

  const handleSelectEmployee = (uid: string | null) => {
    setEmployeeId(uid);
  };

  const handleCreate = async () => {
    await onAddCounter(stationId, {counterNumber: counterNumber});
    setOpen(false);
    // optional: reset form
    setEmployeeId(null);
    setCounterNumber(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Counter</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Counter</DialogTitle>
          <DialogDescription>
            Create a new counter and optionally assign a cashier.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Counter Number Input */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Counter Number
            </label>
            <input
              type="number"
              min={0}
              value={counterNumber}
              onChange={(e) => setCounterNumber(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Employee Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Assign Cashier (optional)
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {employeeId
                    ? employees.find((e) => e.uid === employeeId)?.displayName
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
                    {availableEmployees.map((emp) => (
                      <div
                        key={emp.uid}
                        className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{emp.displayName}</span>
                          <span className="text-xs text-muted-foreground">
                            {emp.role}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSelectEmployee(emp.uid)}
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
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={async() => await handleCreate()}>Create Counter</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCounterDialog;
