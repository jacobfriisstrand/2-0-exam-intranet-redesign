"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      fromYear={1950}
      toYear={new Date().getFullYear()}
      className={cn(
        "my-2 rounded-base bg-black p-3 ring-1 ring-lightGray",
        className,
      )}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 text-white sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex pt-1 relative items-center",
        caption_label: "text-baseSmall",
        dropdown:
          "w-full bg-black rounded-inner py-1 hover:text-accent hover:cursor-pointer",
        caption_dropdowns: "grid grid-cols-2 gap-4 w-full text-white",
        dropdown_year: "flex-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-accent p-0 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-white rounded-base w-8 text-baseSmall",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center rounded-base text-sm hover:bg-accent transition-colors focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-success[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(buttonVariants({ variant: "calendarDay" }), "h-8 w-8 p-0"),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-accent text-white rounded-base focus-visible:rounded-base",
        day_today:
          "text-accent hover:text-white transition-colors focus-visible:text-white",
        day_outside:
          "day-outside text-white opacity-50  aria-selected:bg-neutral-100/50 aria-selected:text-white aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-white opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <MdChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <MdChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
