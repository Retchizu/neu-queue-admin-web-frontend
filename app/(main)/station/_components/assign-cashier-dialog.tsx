"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type Counter from "@/types/counter";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Employee } from "@/types/employee";

interface Props {
  children: React.ReactNode;
  counter: Counter;
  employees: Employee[];
  availableEmployees: Employee[];
}

export default function AssignCashierDialog({
  children,
  counter,
  employees,
  availableEmployees,
}: Props) {
  const [open, setOpen] = useState(false);

  // find assigned employee object (if any)
  const assignedEmployee =
    employees.find((emp) => emp.uid === counter.uid) || null;


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {assignedEmployee ? "Manage Cashier" : "Assign Cashier"}
          </DialogTitle>
          <DialogDescription>
            {assignedEmployee
              ? `Currently assigned: ${assignedEmployee.displayName}`
              : `Assign a cashier to Counter ${counter.counterNumber}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Counter {counter.counterNumber}</h3>
              <p className="text-sm text-muted-foreground">
                {assignedEmployee ? (
                  <span className="font-medium">
                    {assignedEmployee.displayName}
                  </span>
                ) : (
                  "No cashier assigned"
                )}
              </p>
            </div>

            {assignedEmployee ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Assign Cashier</Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="w-72 p-0"
                >
                  <ScrollArea className="max-h-48 p-2">
                    {availableEmployees.length > 0 ? (
                      <div className="space-y-2">
                        {availableEmployees.map((employee) => (
                          <div
                            key={employee.uid}
                            className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                          >
                            <div>
                              <p className="font-medium">
                                {employee.displayName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {employee.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-center text-muted-foreground">
                        No available cashiers
                      </p>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
