"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ProfileSchema = z.object({
  full_name: z.string().min(1, {
    message: "Full name is required.",
  }),
  birthday: z.date({
    required_error: "Birthday is required.",
    invalid_type_error: "Please select a valid date.",
  }),
  studio_location: z.string().min(1, {
    message: "Location is required.",
  }),
  current_position: z.string().min(1, {
    message: "Position is required.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  phone: z.string().min(1, {
    message: "Phone is required.",
  }),
  skills: z.string().optional(),
  avatar_url: z.instanceof(FileList).refine((file) => file.length === 1, {
    message: "File is required.",
  }),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

export default function CompleteProfileForm({
  completeUserProfile,
  message,
  email,
}: {
  completeUserProfile: (formData: FormData) => Promise<void>;
  message?: string;
  email: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      full_name: "",
      birthday: new Date(),
      studio_location: "",
      current_position: "",
      avatar_url: undefined,
      email: email,
      phone: "",
      skills: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("birthday", data.birthday.toISOString().split("T")[0]);
    formData.append("studio_location", data.studio_location);
    formData.append("current_position", data.current_position);
    formData.append("avatar_url", data.avatar_url[0]);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (data.skills) {
      formData.append("skills", data.skills);
    } else {
      formData.append("skills", "");
    }

    await completeUserProfile(formData);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        className="w-full gap-5 space-y-4 lg:grid lg:grid-cols-2 lg:items-baseline lg:space-y-0"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="avatar_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="avatar_url">Upload avatar</FormLabel>
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
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="full_name">Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_position"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="current_position">Position</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your position"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studio_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="studio_location">Studio location</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select studio location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Copenhagen">Copenhagen</SelectItem>
                      <SelectItem value="Aarhus">Aarhus</SelectItem>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="London">London</SelectItem>
                      <SelectItem value="Berlin">Berlin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    value={email}
                    readOnly
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="birthday">Birthday</FormLabel>
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
        </div>
        <div className="flex min-h-full flex-col gap-5">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="skills">Skills</FormLabel>
                <FormControl>
                  <Textarea className="basis-52" {...field} />
                </FormControl>
                <FormDescription>
                  Let others know what skillset you have and what you're good
                  at. Dont hold back.
                </FormDescription>
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
            Complete Profile
          </Button>
          {message && <p className=" text-danger">{message}</p>}
        </div>
      </form>
    </Form>
  );
}
