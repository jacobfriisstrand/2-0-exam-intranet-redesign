import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import AKQALogo from "@/components/Logo/AKQALogo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdArrowForward } from "react-icons/md";
import AnchorLogo from "@/components/Logo/AnchorLogo";

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
            className="w-full"
            variant="ctaFilled"
            formAction={signInUser}
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
