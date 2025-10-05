"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";
import StationList from "./_components/station-list";
import CounterList from "./_components/counter-list";
import type Station from "@/types/station";
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
    toast.success(`Station "${newStation.name}" created`);
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
    const assigned = employees.find((e) => e.id === employeeId);
    const stationName = stations[selectedStationIndex]?.name ?? "";
    toast.success(
      `Counter ${nextNumber} created for ${stationName}${
        assigned ? ` (assigned: ${assigned.name})` : ""
      }`
    );
  }

  function handleAssignEmployee(counterUid: string, employeeId: string | null) {
    const counter = counters.find((c) => c.uid === counterUid);
    const prevEmployee = counter
      ? employees.find((e) => e.id === counter.cashierId)
      : undefined;
    const newEmployee = employeeId
      ? employees.find((e) => e.id === employeeId)
      : undefined;

    setCounters((cs) =>
      cs.map((c) =>
        c.uid === counterUid ? { ...c, cashierId: employeeId } : c
      )
    );

    if (employeeId) {
      toast.success(
        `Assigned ${newEmployee ? newEmployee.name : "staff"} to Counter ${
          counter ? counter.counterNumber : counterUid
        }`
      );
    } else {
      // removal
      toast.success(
        `Removed ${prevEmployee ? prevEmployee.name : "cashier"} from Counter ${
          counter ? counter.counterNumber : counterUid
        }`
      );
    }
  }

  function handleCloseCounter(counterUid: string) {
    const counter = counters.find((c) => c.uid === counterUid);
    setCounters((cs) => cs.filter((c) => c.uid !== counterUid));
    if (counter) {
      const stationIndex = Number(counter.stationID.replace("station-", ""));
      const stationName = stations[stationIndex]?.name ?? counter.stationID;
      toast.success(
        `Closed Counter ${counter.counterNumber} at ${stationName}`
      );
    } else {
      toast.success("Closed counter");
    }
  }

  return (
    <Card className="h-full w-full flex flex-col">
      <CardHeader>
        <CardTitle>Stations and Counters</CardTitle>
        <CardDescription>
          Locate and assign stations along with its designated counter and
          staff.
        </CardDescription>
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
          onCloseCounter={handleCloseCounter}
        />
      </CardContent>
    </Card>
  );
};

export default Stations;
