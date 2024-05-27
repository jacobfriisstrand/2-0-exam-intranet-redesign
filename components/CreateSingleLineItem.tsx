"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward, MdEditSquare } from "react-icons/md";

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
import { MdEdit } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const FormSchema = z.object({
  service: z.string().min(1, { message: "Service is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  purpose: z.string().min(1, { message: "Purpose is required." }),
});

interface CreateSingleLineItemProps {
  tableName: string;
}

export default function CreateSingleLineItem({
  tableName,
}: CreateSingleLineItemProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      service: "",
      username: "",
      password: "",
      purpose: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      return;
    }

    const user = sessionData.session?.user;

    if (user) {
      const { service, username, password, purpose } = data;

      const { error } = await supabase.from(tableName).insert({
        service,
        username,
        password,
        purpose,
      });

      if (error) {
        console.error("Error creating article:", error.message);
        let errorMessage = "An error occurred while creating the article";
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
          <MdEdit className="aria-hidden:true h-[1em]" />
          Add Login
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="">
            <MdEditSquare className="aria-hidden:true h-[1em]" />
            Add Login
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="service">Service</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="purpose">Purpose</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
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
              Add
              <MdArrowForward />
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
