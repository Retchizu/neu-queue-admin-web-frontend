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
import { Badge } from "@/components/ui/badge";
import type Counter from "@/types/counter";
import type Cashier from "@/types/cashier";
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

interface Props {
  children: React.ReactNode;
  counter: Counter;
  employees: Cashier[];
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void;
  onCloseCounter?: (counterUid: string) => void;
}

export default function AssignCashierDialog({
  children,
  counter,
  employees,
  onAssignEmployee,
  onCloseCounter,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const assignedEmployee = employees.find(
    (emp) => emp.id === counter.cashierId
  );

  const handleAssign = (employeeId: string) =>
    assignEmployee(counter.uid, employeeId, onAssignEmployee, setOpen);

  const handleRemove = () =>
    removeEmployee(counter.uid, onAssignEmployee, setOpen);

  const handleCloseCounter = () =>
    closeCounter(counter.uid, onCloseCounter, setOpen);

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
              ? `Currently assigned: ${assignedEmployee.name}`
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
                    <span className="font-medium">{assignedEmployee.name}</span>{" "}
                    <Badge variant="secondary">{assignedEmployee.type}</Badge>
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
                <Button variant="destructive" onClick={handleCloseCounter}>
                  <Trash className="mr-2 h-4 w-4" /> Close Counter
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
                      <div className="space-y-2">
                        {employees
                          .filter((e) => e.type === "payment")
                          .map((employee) => (
                            <div
                              key={employee.id}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div className="flex items-center gap-2">
                                <span>{employee.name}</span>
                                <Badge variant="secondary">
                                  {employee.type}
                                </Badge>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleAssign(employee.id)}
                              >
                                Assign
                              </Button>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>

                <Button variant="destructive" onClick={handleCloseCounter}>
                  <Trash className="mr-2 h-4 w-4" /> Close Counter
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
