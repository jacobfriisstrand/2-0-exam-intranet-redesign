"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward, MdDiscount } from "react-icons/md";

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
import { Textarea } from "./ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { formatISO } from "date-fns";
import { DatePicker } from "./ui/datepicker";

const FormSchema = z.object({
  company: z.string().min(1, {
    message: "Company is required.",
  }),
  discount_code: z.string().min(1, {
    message: "Discount code is required.",
  }),
  info: z.string().min(1, {
    message: "Info is required.",
  }),
  expires_at: z.date({
    required_error: "Expires at is required.",
    invalid_type_error: "Please select a valid date.",
  }),
});

interface CreateDiscountProps {
  tableName: string;
}

export default function CreateDiscount({ tableName }: CreateDiscountProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: "",
      discount_code: "",
      info: "",
      expires_at: new Date(),
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
      const { company, discount_code, info, expires_at } = data;

      const expiresAtUTC = formatISO(
        new Date(
          Date.UTC(
            expires_at.getFullYear(),
            expires_at.getMonth(),
            expires_at.getDate(),
          ),
        ),
      );

      const { error } = await supabase.from(tableName).insert({
        company,
        discount_code,
        info,
        expires_at: expiresAtUTC,
        author_id: userId,
      });

      if (error) {
        console.error("Error creating Discount:", error.message);
        let errorMessage = "An error occurred while creating the Discount";
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
        <Button variant="sheetTrigger" className="fixed bottom-10 right-10">
          <MdDiscount className="aria-hidden:true h-[1em]" />
          Add Discount
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="">
            <MdDiscount className="aria-hidden:true h-[1em]" />
            Add Discout
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="company">Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="discount_code">Discount Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="info">Info</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expires_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="expires_at">Expires at</FormLabel>
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
