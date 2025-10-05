"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type Counter from "@/types/counter";
import type Cashier from "@/types/cashier";
import AddCounterDialog from "./add-counter-dialog";
import AssignCashierDialog from "./assign-cashier-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  counters: Counter[];
  selectedStationIndex: number | null;
  employees: Cashier[];
  onAddCounter?: (employeeId: string | null) => void;
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void;
  onCloseCounter?: (counterUid: string) => void;
}

export default function CounterList({
  counters,
  selectedStationIndex,
  employees,
  onAddCounter,
  onAssignEmployee,
  onCloseCounter,
}: Props) {
  return (
    <Card className="flex-1 min-h-0 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Counters</CardTitle>
        <CardDescription className="flex items-center justify-between">
          Total count: {counters.length}
          {onAddCounter && (
            <AddCounterDialog
              employees={employees}
              onAddCounter={onAddCounter}
            />
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full p-2">
          {selectedStationIndex === null ? (
            <p className="text-muted-foreground text-center">
              Select a station to view its counters
            </p>
          ) : counters.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No counters for this station
            </p>
          ) : (
            counters.map((counter) => {
              const assignedEmployee = employees.find(
                (emp) => emp.id === counter.cashierId
              );
              return (
                <AssignCashierDialog
                  key={counter.uid}
                  counter={counter}
                  employees={employees}
                  onAssignEmployee={onAssignEmployee}
                  onCloseCounter={onCloseCounter}
                >
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors mb-2">
                    <CardContent className="flex flex-col justify-between h-20">
                      <div className="font-medium text-lg">
                        Counter {counter.counterNumber}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="truncate">
                          {counter.serving
                            ? `Serving: ${counter.serving}`
                            : "Not serving"}
                        </div>
                        <Badge variant="secondary">
                          {assignedEmployee
                            ? assignedEmployee.name
                            : "No cashier"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </AssignCashierDialog>
              );
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
