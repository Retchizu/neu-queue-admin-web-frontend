"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type CashierType from "@/types/CashierType";
import type Station from "@/types/station";

const defaultStation: Station = {
  name: "",
  description: "",
  type: "payment",
  activated: true,
};

type Props = {
  onSave?: (station: Station) => void;
};

const AddStationDialog = ({ onSave }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [station, setStation] = React.useState<Station>(defaultStation);

  function handleSave() {
    if (onSave) onSave(station);
    else console.log("Saving station", station);
    setOpen(false);
    setStation(defaultStation);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Station</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Station</DialogTitle>
          <DialogDescription>
            Add a new station to the system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="station-name">
              Name
            </label>
            <Input
              id="station-name"
              value={station.name}
              onChange={(e) => setStation({ ...station, name: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="station-desc">
              Description
            </label>
            <Textarea
              id="station-desc"
              value={station.description}
              onChange={(e) =>
                setStation({ ...station, description: e.target.value })
              }
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="station-type">
              Type
            </label>
            <select
              id="station-type"
              className="rounded-md border px-2 py-1"
              value={station.type}
              onChange={(e) =>
                setStation({ ...station, type: e.target.value as CashierType })
              }
            >
              <option value="payment">Payment</option>
              <option value="clinic">Clinic</option>
              <option value="auditing">Auditing</option>
              <option value="registrar">Registrar</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="station-activated"
              checked={station.activated}
              onCheckedChange={(v) =>
                setStation({ ...station, activated: !!v })
              }
            />
            <label htmlFor="station-activated">Activated</label>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStationDialog;
