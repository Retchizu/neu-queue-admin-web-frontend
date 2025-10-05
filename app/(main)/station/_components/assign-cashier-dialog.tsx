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

interface Props {
  children: React.ReactNode;
  counter: Counter;
  employees: Cashier[];
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void;
}

export default function AssignCashierDialog({
  children,
  counter,
  employees,
  onAssignEmployee,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const assignedEmployee = employees.find(
    (emp) => emp.id === counter.cashierId
  );

  function handleAssign(employeeId: string) {
    onAssignEmployee(counter.uid, employeeId);
    setOpen(false);
  }

  function handleRemove() {
    onAssignEmployee(counter.uid, null);
    setOpen(false);
  }

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
          {assignedEmployee ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">{assignedEmployee.name}</span>
                <Badge variant="secondary">{assignedEmployee.type}</Badge>
              </div>
              <Button variant="destructive" onClick={handleRemove}>
                Remove Cashier
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium">Available Employees:</h4>
              <div className="space-y-2">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span>{employee.name}</span>
                      <Badge variant="secondary">{employee.type}</Badge>
                    </div>
                    <Button size="sm" onClick={() => handleAssign(employee.id)}>
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
