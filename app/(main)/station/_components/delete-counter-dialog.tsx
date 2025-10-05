"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

type Props = {
  stationId: string;
  counterId: string;
  counterNumber: number;
  onDeleteCounter: (
    stationId: string,
    counterId: string
  ) => Promise<void> | void;
};

export default function DeleteCounterDialog({
  stationId,
  counterId,
  counterNumber,
  onDeleteCounter,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    await onDeleteCounter(stationId, counterId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Counter</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete counter <b>{counterNumber}</b>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
