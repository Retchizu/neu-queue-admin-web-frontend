"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type Station from "@/types/station";
import type Counter from "@/types/counter";
import AddStationDialog from "./add-station-dialog";

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
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stations</h3>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Total: {stations.length}
          </div>
          {onAddStation && <AddStationDialog onSave={onAddStation} />}
        </div>
      </div>
      <div className="overflow-auto p-4 flex-1 min-h-0 space-y-2">
        {stations.map((s, idx) => {
          const stationId = `station-${idx}`;
          const count = counters.filter(
            (c) => c.stationID === stationId
          ).length;
          return (
            <Card
              key={`${s.name}-${idx}`}
              className={`h-20 cursor-pointer hover:bg-muted/50 flex flex-col justify-between text-left ${
                selectedIndex === idx ? "bg-muted/80" : ""
              }`}
              onClick={() => onSelect(idx)}
            >
              <div className="font-medium">{s.name}</div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="truncate">{s.description}</div>
                <Badge variant="secondary">{count} counters</Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default StationList;
