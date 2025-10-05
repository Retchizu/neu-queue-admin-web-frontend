"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Employee } from "@/types/employee";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: Employee | null;
  selectedRole: Employee["role"];
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ChangeRoleDialog({
  open,
  onOpenChange,
  selected,
  selectedRole,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open && !!selected} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change role</DialogTitle>
          <DialogDescription>
            Are you sure you want to change this user&apos;s role to{" "}
            <strong>{selectedRole}</strong>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                onCancel?.();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
