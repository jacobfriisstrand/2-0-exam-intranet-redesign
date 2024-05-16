// Import necessary modules and types
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import AKQALogo from "@/components/Logo/AKQALogo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdArrowForward } from "react-icons/md";
import AnchorLogo from "@/components/Logo/AnchorLogo";

// Sign-in function
export default async function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInUser = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error, data: session } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !session) {
      return redirect("/?message=Could not authenticate user");
    }

    const { user } = session;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return redirect("/?message=Could not fetch user profile");
    }

    const requiredFields = ["full_name", "phone_number", "address"]; // Add other required fields as needed
    const missingFields = requiredFields.filter((field) => !profile[field]);

    if (missingFields.length > 0) {
      return redirect(`/complete-profile?email=${encodeURIComponent(email)}`);
    }

    return redirect("/protected");
  };

  return (
    <div className="flex h-screen place-items-center justify-center px-5">
      <section className="flex max-w-sm flex-1 flex-col place-items-center gap-8">
        <AKQALogo className="w-40" />
        <AnchorLogo className="w-20" />
        <form className="w-full space-y-4">
          <div className="space-y-2">
            <Label className="text-md" htmlFor="email">
              Email
            </Label>
            <Input
              className="w-full"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              className="w-full"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <Button
            formAction={signInUser}
            className="w-full"
            variant="ctaFilled"
            type="submit"
          >
            Sign In
            <MdArrowForward />
          </Button>
          {searchParams?.message && (
            <p className="absolute text-danger">{searchParams.message}</p>
          )}
        </form>
      </section>
    </div>
  );
}
