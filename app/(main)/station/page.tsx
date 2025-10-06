"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { isAxiosError, AxiosError } from "axios";
import StationList from "./_components/station-list";
import CounterList from "./_components/counter-list";
import type Station from "@/types/station";
import type Counter from "@/types/counter";
import api from "@/lib/api";
import { Employee } from "@/types/employee";
import { PartialStation } from "@/types/station";

/* const initialStations: Station[] = [
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
 */
const Stations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(
    null
  );
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await api.get("/station/get");
        setStations(response.data.cashierLocationList);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosErr = error as AxiosError;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const respData: any = axiosErr.response?.data;
          const message =
            respData?.message ?? String(axiosErr.message ?? axiosErr);
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }
        console.error(error);
      }
    };
    getStations();
  }, []);

  useEffect(() => {
    if (selectedStationId === null) return;

    const getCounter = async () => {
      try {
        const response = await api.get(`/counter/get/${selectedStationId}`);
        setCounters(response.data.counterList);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosErr = error as AxiosError;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const respData: any = axiosErr.response?.data;
          const message =
            respData?.message ?? String(axiosErr.message ?? axiosErr);
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }
        console.error(error);
      }
    };
    getCounter();
  }, [selectedStationId]);

  useEffect(() => {
    const getCounterEmployee = async () => {
      try {
        // only include counters with a non-empty uid
        const filteredCounters = counters.filter(
          (c) => c.uid && String(c.uid).trim() !== ""
        );
        const promises = filteredCounters.map((c) =>
          api.get(`admin/user-data/${c.uid}`)
        );

        const responses = await Promise.all(promises);

        const result = responses.map((res) => res.data.userData);
        setEmployees(result);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosErr = error as AxiosError;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const respData: any = axiosErr.response?.data;
          const message =
            respData?.message ?? String(axiosErr.message ?? axiosErr);
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }
        console.error("Failed to fetch counter employees:", error);
      }
    };

    if (counters.length > 0) {
      getCounterEmployee();
    }
  }, [counters]);

  useEffect(() => {
    const getAvailableEmployees = async () => {
      try {
        const response = await api.get("/admin/available-cashier-employees");
        setAvailableEmployees(response.data.availableCashiers);
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosErr = error as AxiosError;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const respData: any = axiosErr.response?.data;
          const message =
            respData?.message ?? String(axiosErr.message ?? axiosErr);
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error(String(error));
        }
        console.error(error);
      }
    };
    getAvailableEmployees();
  }, []);

  const addStation = async (newStation: PartialStation) => {
    try {
      const response = await api.post("/station/add", newStation);
      setStations((prev) => [...prev, response.data.station]);
      if (response.data?.message) toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const respData: any = axiosErr.response?.data;
        const message =
          respData?.message ?? String(axiosErr.message ?? axiosErr);
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
      console.error(error);
    }
  };

  const updateStation = async (updatedStation: PartialStation) => {
    try {
      if (!selectedStationId) return; // safety check

      const response = await api.put(
        `/station/update/${selectedStationId}`,
        updatedStation
      );

      // update local state
      setStations((prevStations) =>
        prevStations.map((s) =>
          s.id === selectedStationId ? { ...s, ...response.data.station } : s
        )
      );

      toast.success("Station updated successfully!");
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? (error as Error).message);
      } else {
        toast.error((error as Error).message);
      }
      console.error("Failed to update station:", error);
    }
  };

  const deleteStation = async (stationId: string) => {
    try {
      const response = await api.delete(`/station/delete/${stationId}`);
      setStations(stations.filter((station) => station.id !== stationId));
      if (response.data?.message) toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const respData: any = axiosErr.response?.data;
        const message =
          respData?.message ?? String(axiosErr.message ?? axiosErr);
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
      console.error(error);
    }
  };

  const addCounter = async (
    stationId: string,
    newCounter: Partial<Counter>
  ) => {
    console.log("test");
    try {
      const response = await api.post(`counter/add/${stationId}`, newCounter);
      setCounters((prev) => [...prev, response.data.counter]);
      if (response.data?.message) toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? (error as Error).message);
      } else {
        toast.error((error as Error).message);
      }
      console.error(error);
    }
  };

  const updateCounter = async (
    stationId: string,
    counterId: string,
    updatedCounter: Partial<Counter>
  ) => {
    try {
      const response = await api.put(
        `counter/update/${stationId}/${counterId}`,
        {
          counterNumber: updatedCounter.counterNumber,
          employeeUID: updatedCounter.uid,
        }
      );
      setCounters((prevCounters) =>
        prevCounters.map((prev) =>
          prev.id === counterId
            ? { ...prev, ...response.data.counter, ...updatedCounter }
            : prev
        )
      );
      if (response.data?.message) toast.success(response.data.message);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? (error as Error).message);
      } else {
        toast.error((error as Error).message);
      }
      console.error(error);
    }
  };

  const deleteCounter = async (stationId: string, counterId: string) => {
    try {
      await api.delete(`/counter/delete/${stationId}/${counterId}`);
      setCounters((prev) => prev.filter((c) => c.id !== counterId));
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? (error as Error).message);
      } else {
        toast.error((error as Error).message);
      }
      console.error(error);
    }
  };

  return (
    <Card className="h-full w-full flex flex-col border border-[var(--primary)] rounded-xl">
      <CardHeader>
        <CardTitle>Stations and Counters</CardTitle>
        <CardDescription>
          Locate and assign stations along with its designated counter and
          staff.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-2 flex-1 min-h-0">
        {/* Station panel: shows a primary border on hover */}
        <div className="flex-1 min-h-0 border border-transparent hover:border-[var(--primary)] transition-colors duration-150 rounded-xl">
          <StationList
            stations={stations}
            selectedId={selectedStationId}
            onSelect={setSelectedStationId}
            onAddStation={addStation}
            onDeleteStation={deleteStation}
            onUpdateStation={updateStation}
          />
        </div>

        {/* Counter panel: shows a primary border on hover */}
        <div className="flex-1 min-h-0 border border-transparent hover:border-[var(--primary)] transition-colors duration-150 rounded-xl">
          <CounterList
            stationId={selectedStationId!}
            counters={counters}
            selectedStationIndex={selectedStationId}
            employees={employees}
            availableEmployees={availableEmployees}
            onAddCounter={addCounter}
            onDeleteCounter={deleteCounter}
            onUpdateCounter={updateCounter}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Stations;
