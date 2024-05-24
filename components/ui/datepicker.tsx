"use client";

import * as React from "react";
import { format } from "date-fns";
import { MdCalendarMonth } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  onBlur: () => void;
  selected: Date | undefined;
}

export function DatePicker({ value, onChange, onBlur }: DatePickerProps) {
  const [localDate, setLocalDate] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    if (localDate !== undefined) {
      onChange(localDate);
    }
  }, [localDate, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"calendarSelect"}
          className={cn("", !localDate && "text-white")}
        >
          <MdCalendarMonth className="size-4" />
          {localDate ? (
            format(localDate, "yyyy-MM-dd")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-sheet w-auto p-0">
        <Calendar
          mode="single"
          selected={localDate}
          onSelect={(date) => {
            setLocalDate(date);
            onBlur();
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
