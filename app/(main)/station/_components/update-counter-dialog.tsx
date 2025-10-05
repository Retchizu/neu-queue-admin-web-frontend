"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type Counter from "@/types/counter";

type Props = {
  counter: Counter;
  stationId: string;
  onUpdateCounter: (stationId: string, counterId: string, updatedCounter: Partial<Counter>) => void;
};

const EditCounterDialog = ({ stationId, counter, onUpdateCounter }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    counterNumber: counter.counterNumber,
  });

  const handleUpdate = () => {
    onUpdateCounter(stationId, counter.id, {counterNumber: formData.counterNumber});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setFormData({
            counterNumber: counter.counterNumber
          })}
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Counter</DialogTitle>
          <DialogDescription>
            Modify the counter number or toggle its active status.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="counter-number">
              Counter Number
            </label>
            <Input
              id="counter-number"
              type="number"
              min={1}
              value={formData.counterNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  counterNumber: Number(e.target.value)
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCounterDialog;
