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
import { Spinner } from "@/components/ui/spinner";
import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type Counter from "@/types/counter";
import type { Employee } from "@/types/employee";

type Props = {
  counter: Counter;
  stationId: string;
  availableEmployees: Employee[];
  onUpdateCounter: (
    stationId: string,
    counterId: string,
    updatedCounter: Partial<Counter>
  ) => Promise<void>;
};

const EditCounterDialog = ({
  stationId,
  counter,
  availableEmployees,
  onUpdateCounter,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    counterNumber: counter.counterNumber,
    uid: counter.uid || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      await onUpdateCounter(stationId, counter.id, {
        counterNumber: formData.counterNumber,
        uid: formData.uid,
      });
      setOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectEmployee = (uid: string | null) => {
    setFormData((prev) => ({ ...prev, uid: uid || "" }));
    // close the popover after selection
    setIsPopoverOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() =>
            setFormData({
              counterNumber: counter.counterNumber,
              uid: counter.uid || "",
            })
          }
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Counter</DialogTitle>
          <DialogDescription>
            Modify the counter number or assign a cashier.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Counter Number */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Counter Number
            </label>
            <Input
              type="number"
              min={1}
              value={formData.counterNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  counterNumber: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Assign Employee */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Assign Cashier
            </label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {formData.uid
                    ? availableEmployees.find((e) => e.uid === formData.uid)
                        ?.displayName
                    : "Select cashier"}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-72 p-0">
                <ScrollArea className="max-h-48 p-2">
                  <div className="space-y-2">
                    <button
                      className="w-full text-left text-sm text-muted-foreground p-2 hover:bg-muted rounded"
                      onClick={() => handleSelectEmployee(null)}
                    >
                      Unassign
                    </button>
                    {availableEmployees.map((emp) => (
                      <div
                        key={emp.uid}
                        className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{emp.displayName}</span>
                          <span className="text-xs text-muted-foreground">
                            {emp.role}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSelectEmployee(emp.uid)}
                        >
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSaving}>
              {isSaving ? <Spinner /> : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCounterDialog;
