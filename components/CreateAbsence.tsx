"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward, MdCottage } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { DatePicker } from "./ui/datepicker";
import { formatISO } from "date-fns";

const FormSchema = z.object({
  reason: z.string().min(1, {
    message: "Reason is required.",
  }),
  start_date: z.date({
    required_error: "Start date is required.",
    invalid_type_error: "Please select a valid date.",
  }),
  end_date: z.date({
    required_error: "End date is required.",
    invalid_type_error: "Please select a valid date.",
  }),
});

interface CreateAbsenceProps {
  tableName: string;
  variant?: string;
}

export default function CreateAbsence({
  tableName,
  variant,
}: CreateAbsenceProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      setLoading(false);
      return;
    }

    const user = sessionData.session?.user;

    if (user) {
      const userId = user.id;
      const { reason, start_date, end_date } = data;

      // Convert local date to UTC date string
      const startDateUTC = formatISO(
        new Date(
          Date.UTC(
            start_date.getFullYear(),
            start_date.getMonth(),
            start_date.getDate(),
          ),
        ),
      );
      const endDateUTC = formatISO(
        new Date(
          Date.UTC(
            end_date.getFullYear(),
            end_date.getMonth(),
            end_date.getDate(),
          ),
        ),
      );

      const { error } = await supabase.from(tableName).insert({
        reason,
        start_date: startDateUTC,
        end_date: endDateUTC,
        user_id: userId,
      });

      if (error) {
        console.error("Error creating Absence:", error.message);
        let errorMessage = "An error occurred while creating the Absence";
        if (error.message.includes("duplicate key value")) {
          errorMessage = "The title must be unique";
        }
      } else {
        window.location.reload();
      }
    } else {
      console.error("User is not logged in");
    }
    setLoading(false);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={variant === "homepage" ? "filled" : "sheetTrigger"}
          className=""
        >
          {variant !== "homepage" && (
            <MdCottage className="aria-hidden:true h-[1em]" />
          )}
          Add absence
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="">
            <MdCottage className="aria-hidden:true h-[1em]" />
            Add absence
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="start_date">Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value || new Date()}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      selected={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="end_date">End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value || new Date()}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      selected={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reason">Reason</FormLabel>
                  <FormControl>
                    <Input id="reason" placeholder="Reason" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              isLoading={loading}
              type="submit"
              className="w-full"
              variant="ctaFilled"
            >
              Publish
              <MdArrowForward />
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
