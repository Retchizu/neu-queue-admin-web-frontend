"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | null;
  onChange?: (d: Date | undefined) => void;
  disabled?: boolean;
  label?: string;
}

export function DatePicker({
  value,
  onChange,
  disabled,
  label,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!value}
          className={`data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal ${
            disabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>{label ?? "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}
