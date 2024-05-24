import { MenuItem } from "@/app/interfaces";
import { getCanteenMenu } from "@/sanity/sanity-utils";
import { createClient } from "@/utils/supabase/server";

interface CanteenMenuCardProps {
  menuItem: MenuItem;
  data?: { studio_location?: string };
  currentDate: Date;
}

function CanteenMenuCard({
  menuItem,
  data,
  currentDate,
}: CanteenMenuCardProps) {
  const currentWeekday = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <li
      className={`${menuItem.day === currentWeekday ? "border-accent" : "border-darkGray"} min-w-[80%] flex-1 snap-start rounded-base border-base bg-black p-5 lg:min-w-[60%] xl:min-w-[inherit]`}
    >
      <article className="flex h-full  flex-col gap-4">
        <p className="font-heading text-step1">{menuItem.day}</p>
        <p>
          {/* @ts-ignore */}
          {data?.studio_location && menuItem[data.studio_location]?.mainDish}
        </p>
        <div>
          <p className="text-lightGray">Vegan option</p>
          <p>
            {/* @ts-ignore */}
            {data?.studio_location && menuItem[data.studio_location]?.veganDish}
          </p>
        </div>
      </article>
    </li>
  );
}

export default async function CanteenMenu({
  currentDate,
}: {
  currentDate: Date;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("studio_location")
    .eq("id", user?.id)
    .single();

  const menuData = await getCanteenMenu(data?.studio_location);

  console.log(menuData);

  return (
    <ol className="scrollbar-hide flex snap-both gap-5 overflow-y-scroll">
      {menuData?.map((menuItem: MenuItem) => (
        <CanteenMenuCard
          key={menuItem.id}
          data={{ studio_location: data?.studio_location || "" }}
          menuItem={menuItem}
          currentDate={new Date()}
        />
      ))}
    </ol>
  );
}
