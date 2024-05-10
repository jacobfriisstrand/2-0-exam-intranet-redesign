import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function UserSignout() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="flex items-center gap-4">
      Hey, {user?.email}! You are logged in on protected routes.
      <form action={signOut}>
        <Button variant={"outline"}>Logout</Button>
      </form>
    </div>
  );
}
