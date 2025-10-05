"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type Station from "@/types/station";
import type Counter from "@/types/counter";
import AddStationDialog from "./add-station-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  stations: Station[];
  counters: Counter[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onAddStation?: (newStation: Station) => void;
};

const StationList = ({
  stations,
  counters,
  selectedIndex,
  onSelect,
  onAddStation,
}: Props) => {
  return (
    <Card className="flex-1 min-h-0 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Stations</CardTitle>
        <CardDescription className="flex items-center justify-between">
          Total count: {stations.length}
          {onAddStation && <AddStationDialog onSave={onAddStation} />}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full w-full p-2">
          {stations.map((s, idx) => {
            const stationId = `station-${idx}`;
            const count = counters.filter(
              (c) => c.stationID === stationId
            ).length;

            return (
              <Card
                key={`${s.name}-${idx}`}
                className={`cursor-pointer hover:bg-muted/50 transition-colors mb-2 ${
                  selectedIndex === idx ? "bg-muted/80" : ""
                }`}
                onClick={() => onSelect(idx)}
              >
                <CardContent className="flex flex-col justify-between h-20">
                  <div className="font-medium text-lg">{s.name}</div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="truncate">{s.description}</div>
                    <Badge variant="secondary">{count} counters</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StationList;
