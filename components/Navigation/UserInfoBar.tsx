import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdSearch } from "react-icons/md";

export default async function UserInfoBar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("studio_location, full_name, current_position")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="grid w-full grid-cols-[repeat(2,auto)] grid-rows-[repeat(3,auto)] items-center gap-3 lg:fixed lg:top-0 lg:z-navigation lg:ml-[calc(var(--desktopSidebarWidth)-1.5rem)] lg:flex lg:w-[calc(100vw-var(--desktopSidebarWidth))] lg:border-b-base  lg:border-b-darkGray lg:bg-black lg:p-5">
      <div className="col-start-1 lg:row-start-1 lg:mr-auto">
        <p className="text-white">{profile?.full_name}</p>
        <p className="text-lightGray">{profile?.current_position}</p>
        <p className="text-lightGray">{profile?.studio_location}</p>
      </div>
      <form className="col-start-2 lg:order-2 lg:row-start-1" action={signOut}>
        <Button className="h-max-content w-full" variant={"filled"}>
          Logout
        </Button>
      </form>

      <div className="col-span-2 row-start-3 lg:col-span-1 lg:row-start-1">
        <Input
          type="search"
          name="search"
          className="h-fit w-full lg:w-fit"
          icon={<MdSearch className="text-accent" />}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}
