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
import { PartialStation } from "@/types/station";
import { Pencil } from "lucide-react";

import { saveStation } from "@/app/(main)/station/utils/stationHandlers";

type Props = {
  station: PartialStation; // prefilled data
  onSave?: (updatedStation: PartialStation) => void;
};

const UpdateStationDialog = ({ station, onSave }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [editedStation, setEditedStation] =
    React.useState<PartialStation>(station);

  const handleUpdate = () =>
    saveStation(editedStation, onSave, setOpen, setEditedStation, station);

  React.useEffect(() => {
    setEditedStation(station);
  }, [station]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-blue-500"
          onClick={(e) => e.stopPropagation()} // prevent select click
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Station</DialogTitle>
          <DialogDescription>
            Modify details for <b>{station.name}</b>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="station-name">
              Name
            </label>
            <Input
              id="station-name"
              value={editedStation.name}
              onChange={(e) =>
                setEditedStation({ ...editedStation, name: e.target.value })
              }
            />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="station-desc">
              Description
            </label>
            <Textarea
              id="station-desc"
              value={editedStation.description}
              onChange={(e) =>
                setEditedStation({
                  ...editedStation,
                  description: e.target.value,
                })
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
              value={editedStation.type}
              onChange={(e) =>
                setEditedStation({
                  ...editedStation,
                  type: e.target.value as CashierType,
                })
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
              checked={editedStation.activated}
              onCheckedChange={(v) =>
                setEditedStation({ ...editedStation, activated: !!v })
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
            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStationDialog;
