"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useVerifyUser } from "@/hooks/useVerifyUser";
import React from "react";
import AddStationDialog from "./_components/add-station-dialog";
import StationList from "./_components/station-list";
import CounterList from "./_components/counter-list";
import type Station from "@/types/station";
// CashierType moved to string union — use direct strings in mock data
import type Counter from "@/types/counter";

const initialStations: Station[] = [
  {
    name: "Main Entrance",
    description: "Main queue for general inquiries",
    type: "payment",
    activated: true,
  },
  {
    name: "Payments",
    description: "Payments and billing",
    type: "registrar",
    activated: true,
  },
  {
    name: "Support",
    description: "Technical support counters",
    type: "clinic",
    activated: false,
  },
];

const initialCounters: Counter[] = initialStations.flatMap((s, si) =>
  Array.from({ length: 3 }).map((_, i) => ({
    counterNumber: i + 1,
    stationID: `station-${si}`,
    uid: `ctr-${si}-${i}`,
    serving:
      Math.random() > 0.6 ? `User ${Math.floor(Math.random() * 100)}` : null,
    cashierId: null,
  }))
);

import type Cashier from "@/types/cashier";

const mockEmployees: Cashier[] = [
  { id: "emp-1", name: "Alice Johnson", type: "payment" },
  { id: "emp-2", name: "Bob Smith", type: "clinic" },
  { id: "emp-3", name: "Charlie Brown", type: "registrar" },
  { id: "emp-4", name: "Diana Davis", type: "auditing" },
];

const Stations = () => {
  const [stations, setStations] = React.useState<Station[]>(initialStations);
  const [counters, setCounters] = React.useState<Counter[]>(initialCounters);
  const [employees] = React.useState(mockEmployees);
  const [selectedStationIndex, setSelectedStationIndex] = React.useState<
    number | null
  >(null);

  const selectedStationId =
    selectedStationIndex !== null ? `station-${selectedStationIndex}` : null;

  const countersForSelected = selectedStationId
    ? counters.filter((c) => c.stationID === selectedStationId)
    : [];

  function handleAddStation(newStation: Station) {
    setStations((s) => [...s, newStation]);
  }

  function handleAddCounter(employeeId: string | null) {
    if (selectedStationIndex === null) return;
    const stationId = `station-${selectedStationIndex}`;
    const stationCounters = counters.filter((c) => c.stationID === stationId);
    const nextNumber = stationCounters.length + 1;
    const newCounter: Counter = {
      counterNumber: nextNumber,
      stationID: stationId,
      uid: `ctr-${selectedStationIndex}-${nextNumber - 1}`,
      serving: null,
      cashierId: employeeId || null,
    };
    setCounters((cs) => [...cs, newCounter]);
  }

  function handleAssignEmployee(counterUid: string, employeeId: string | null) {
    setCounters((cs) =>
      cs.map((c) =>
        c.uid === counterUid ? { ...c, cashierId: employeeId } : c
      )
    );
  }

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Stations and Counters</CardTitle>
        <CardDescription>
          Locate and assign stations along with its designated counter and
          staff.
        </CardDescription>
        <AddStationDialog />
      </CardHeader>

      <CardContent className="flex gap-2 flex-1 min-h-0">
        <StationList
          stations={stations}
          counters={counters}
          selectedIndex={selectedStationIndex}
          onSelect={setSelectedStationIndex}
          onAddStation={handleAddStation}
        />

        <CounterList
          counters={countersForSelected}
          selectedStationIndex={selectedStationIndex}
          employees={employees}
          onAddCounter={
            selectedStationIndex !== null ? handleAddCounter : undefined
          }
          onAssignEmployee={handleAssignEmployee}
        />
      </CardContent>
    </Card>
  );
};

export default Stations;
