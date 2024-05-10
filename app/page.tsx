import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInUser = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  return (
    <section className="flex flex-col space-y-8 place-items-center">
      <Logo />
      <form className="space-y-4 w-full">
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
        <Button className="w-full" variant="outline" formAction={signInUser}>
          Sign In
        </Button>
        {searchParams?.message && (
          <p className="text-danger">{searchParams.message}</p>
        )}
      </form>
    </section>
  );
}
