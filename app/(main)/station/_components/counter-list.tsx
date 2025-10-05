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
import AddCounterDialog from "./add-counter-dialog";
import AssignCashierDialog from "./assign-cashier-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Employee } from "@/types/employee";
import EditCounterDialog from "./update-counter-dialog";
import DeleteCounterDialog from "./delete-counter-dialog";

type Props = {
  stationId: string;
  counters: Counter[];
  selectedStationIndex: string | null;
  employees: Employee[];
  availableEmployees: Employee[];
  onAddCounter?: (
    stationId: string,
    newCounter: Partial<Counter>
  ) => Promise<void>;
  onUpdateCounter?: (
    stationId: string,
    counterId: string,
    updatedData: Partial<Counter>
  ) => Promise<void>;
  onDeleteCounter?: (stationId: string, counterId: string) => void;
};

export default function CounterList({
  stationId,
  counters,
  selectedStationIndex,
  employees,
  availableEmployees,
  onAddCounter,
  onUpdateCounter,
  onDeleteCounter,
}: Props) {
  return (
    <Card className="flex-1 min-h-0 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Counters</CardTitle>
        <CardDescription className="flex items-center justify-between">
          Total count: {counters.length}
          {onAddCounter && (
            <AddCounterDialog
              stationId={stationId}
              employees={employees}
              onAddCounter={onAddCounter}
              availableEmployees={availableEmployees}
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
                (emp) => emp.uid === counter.uid
              );

              return (
                <AssignCashierDialog
                  key={counter.id}
                  counter={counter}
                  employees={employees}
                  availableEmployees={availableEmployees}
                >
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors mb-2">
                    <CardContent className="flex flex-col justify-between h-20">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-lg">
                          Counter {counter.counterNumber}
                        </div>

                        {/* 🧩 Edit + Delete row */}
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {onUpdateCounter && (
                            <EditCounterDialog
                              availableEmployees={availableEmployees}
                              counter={counter}
                              stationId={stationId}
                              onUpdateCounter={onUpdateCounter}
                            />
                          )}
                          {onDeleteCounter && (
                            <DeleteCounterDialog
                              stationId={stationId}
                              counterId={counter.id}
                              counterNumber={counter.counterNumber}
                              onDeleteCounter={onDeleteCounter}
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="truncate">
                          {counter.serving
                            ? `Serving: ${counter.serving}`
                            : "Not serving"}
                        </div>
                        <Badge variant="secondary">
                          {assignedEmployee
                            ? assignedEmployee.displayName
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
