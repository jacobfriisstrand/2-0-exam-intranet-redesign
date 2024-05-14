import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default async function SearchBar() {
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
    <div className="flex w-full items-center  justify-between gap-4 bg-black xl:fixed xl:top-0 xl:z-navigation xl:ml-[calc(var(--desktopSidebarWidth)-1.5rem)]  xl:w-[calc(100vw-var(--desktopSidebarWidth)-1rem)]  xl:border-b-base xl:border-b-darkGray xl:p-5">
      <div>
        <p>{user?.email}</p>
        <p className="text-lightGray">Position</p>
        <p className="text-lightGray">Studio Location</p>
      </div>
      <form action={signOut}>
        <Button variant={"outline"}>Logout</Button>
      </form>
    </div>
  );
}
