"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type Station from "@/types/station";
import AddStationDialog from "./add-station-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PartialStation } from "@/types/station";

import DeleteStationDialog from "./delete-station-dialog";
import UpdateStationDialog from "./update-station-dialog";

type Props = {
  stations: Station[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddStation?: (newStation: PartialStation) => void;
  onDeleteStation?: (id: string) => void;
  onUpdateStation?: (updatedStation: PartialStation) => void;
};

const StationList = ({
  stations,
  selectedId,
  onSelect,
  onAddStation,
  onDeleteStation,
  onUpdateStation,
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
          {stations.map((s) => {
            const stationId = s.id;
            return (
              <Card
                key={s.id}
                className={`cursor-pointer hover:bg-muted/50 transition-colors mb-2 ${
                  selectedId === s.id ? "bg-muted/80" : ""
                }`}
                onClick={() => onSelect(stationId)}
              >
                <CardContent className="flex items-center justify-between h-20">
                  <div className="flex flex-col overflow-hidden">
                    <div className="font-medium text-lg truncate">{s.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {s.description}
                    </div>
                  </div>

                  <div>
                    {selectedId === s.id && onUpdateStation && (
                      <UpdateStationDialog
                        station={s}
                        onSave={onUpdateStation}
                      />
                    )}
                     {selectedId === s.id && onDeleteStation && (
                      <DeleteStationDialog
                        stationName={s.name}
                        onConfirm={() => onDeleteStation(stationId)}
                      />
                    )}
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
