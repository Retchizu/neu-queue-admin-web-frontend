"use client";

import React from "react";
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
import { Trash } from "lucide-react";
import {
  assignEmployee,
  removeEmployee,
  closeCounter,
} from "@/app/(main)/station/utils/counterHandlers";
import { Employee } from "@/types/employee";

interface Props {
  children: React.ReactNode;
  counter: Counter;
  employees: Employee[];
  availableEmployees: Employee[];
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void;
  onCloseCounter?: (counterUid: string) => void;
}

export default function AssignCashierDialog({
  children,
  counter,
  employees,
  availableEmployees,
  onAssignEmployee,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const assignedEmployee = employees.find(
    (emp) => emp.uid === counter.uid
  );

  const handleAssign = (employeeId: string) =>
    assignEmployee(counter.uid, employeeId, onAssignEmployee, setOpen);

  const handleRemove = () =>
    removeEmployee(counter.uid, onAssignEmployee, setOpen);

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
                  <>
                    <span className="font-medium">{assignedEmployee.displayName}</span>{" "}
                  </>
                ) : (
                  <span className="text-sm">No staff assigned</span>
                )}
              </p>
            </div>

            {assignedEmployee ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={handleRemove}>
                  Remove Cashier
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
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
                     {availableEmployees.length > 0 ?  <div className="space-y-2">
                        {availableEmployees
                          .map((employee) => (
                            <div
                              key={employee.uid}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div className="flex items-center gap-2">
                                <span>{employee.displayName}</span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleAssign(employee.uid)}
                              >
                                Assign
                              </Button>
                            </div>
                          ))}
                      </div>: <p className="text-sm">No Available Cashiers</p>}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>

              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
