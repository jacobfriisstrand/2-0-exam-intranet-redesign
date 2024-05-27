"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward, MdUpload } from "react-icons/md";

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

interface CreateFileProps {
  bucketName: string | "";
}

// Define the schema for the form validation
const FormSchema = z.object({
  file: z.instanceof(FileList).refine((file) => file.length === 1, {
    message: "File is required.",
  }),
});

export const CreateFile: React.FC<CreateFileProps> = ({ bucketName }) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const { data: sessionData } = await supabase.auth.getSession();

    const user = sessionData.session?.user;

    if (user) {
      // Insert the file into the bucket
      const { data: fileData, error: fileError } = await supabase.storage
        .from(bucketName)
        .upload(`${data.file[0].name}`, data.file[0], {
          cacheControl: "3600",
          upsert: false,
        });

      window.location.reload();
      setLoading(false);

      if (fileError) {
        console.error("Error uploading file:", fileError);
        return;
      }
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="sheetTrigger" className="fixed bottom-10 right-10">
          <MdUpload className="aria-hidden:true h-[1em]" />
          Upload file
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <MdUpload className="aria-hidden:true h-[1em]" />
            Upload file
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="file">Upload file</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files as unknown as FileList);
                      }}
                      ref={field.ref}
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
              Upload
              <MdArrowForward />
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
