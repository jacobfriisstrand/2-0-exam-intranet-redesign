import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    <div>
      <form>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input name="email" placeholder="you@example.com" required />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button variant="outline" formAction={signInUser}>
          Sign In
        </Button>

        {searchParams?.message && <p>{searchParams.message}</p>}
      </form>
    </div>
  );
}
