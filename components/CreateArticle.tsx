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
import { createClient } from "@/utils/supabase/client"; // Import the client-side Supabase client
import { useState } from "react";

// Define the schema for the form validation
const FormSchema = z.object({
  content: z.string().min(10, {
    message: "The text must be at least 10 characters long",
  }),
  title: z.string().min(1, { message: "Title is required" }),
  generalError: z.string().optional(), // Add a custom field for general errors
});

export default function CreateArticle() {
  const supabase = createClient(); // Initialize the client-side Supabase client
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      form.setError("generalError", { message: sessionError.message });
      setLoading(false);
      return;
    }

    const user = sessionData.session?.user;

    if (user) {
      const userId = user.id;
      const { title, content } = data;

      // Insert the new article into the news table
      const { error } = await supabase.from("news").insert({
        title,
        content,
        author_id: userId,
        slug: title
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")
          .toLowerCase(),
      });

      if (error) {
        console.error("Error creating article:", error.message);
        // Handle specific errors
        let errorMessage = "An error occurred while creating the article";
        if (error.message.includes("duplicate key value")) {
          errorMessage = "The title must be unique";
        }
        form.setError("generalError", { message: errorMessage });
      } else {
        window.location.reload();
      }
    } else {
      console.error("User is not logged in");
      form.setError("generalError", { message: "User is not logged in" });
    }
    setLoading(false);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="sheetTrigger" className="fixed bottom-10 right-10">
          <MdEdit className="aria-hidden:true h-[1em]" />
          Add Article
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle className="">
            <MdEditSquare className="aria-hidden:true h-[1em]" />
            Add Article
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.generalError && (
              <p className=" text-danger">
                {form.formState.errors.generalError.message}
              </p>
            )}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="content">Content</FormLabel>
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
              Publish
              <MdArrowForward />
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
