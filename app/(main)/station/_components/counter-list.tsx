"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type Counter from "@/types/counter";
import type Cashier from "@/types/cashier";
import AddCounterDialog from "./add-counter-dialog";
import AssignCashierDialog from "./assign-cashier-dialog";

interface Props {
  counters: Counter[];
  selectedStationIndex: number | null;
  employees: Cashier[];
  onAddCounter?: (employeeId: string | null) => void;
  onAssignEmployee: (counterUid: string, employeeId: string | null) => void;
}

export default function CounterList({
  counters,
  selectedStationIndex,
  employees,
  onAddCounter,
  onAssignEmployee,
}: Props) {
  return (
    <div className="w-1/2 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle>Counters</CardTitle>
          {onAddCounter && (
            <AddCounterDialog employees={employees} onAddCounter={onAddCounter} />
          )}
        </CardHeader>
        <CardContent>
          {selectedStationIndex === null ? (
            <p className="text-muted-foreground text-center">
              Select a station to view its counters
            </p>
          ) : counters.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No counters for this station
            </p>
          ) : (
            <div className="space-y-3">
              {counters.map((counter) => {
                const assignedEmployee = employees.find(
                  (emp) => emp.id === counter.cashierId
                );
                return (
                  <AssignCashierDialog
                    key={counter.uid}
                    counter={counter}
                    employees={employees}
                    onAssignEmployee={onAssignEmployee}
                  >
                    <Card className="border cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">
                              Counter {counter.counterNumber}
                            </h4>
                            <div className="flex gap-2 mt-2">
                              <Badge
                                variant={
                                  counter.serving ? "default" : "secondary"
                                }
                              >
                                {counter.serving ? "Serving" : "Available"}
                              </Badge>
                              {assignedEmployee && (
                                <Badge variant="outline">
                                  {assignedEmployee.name}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AssignCashierDialog>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}