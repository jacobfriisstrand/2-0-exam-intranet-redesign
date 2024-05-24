import { getWeek, parseISO } from "date-fns";
import React from "react";
import { createClient } from "@/utils/supabase/server";

export default async function Birthdays() {
  const supabase = createClient();

  const currentDate = new Date();
  const currentWeek = getWeek(currentDate);

  const { data } = await supabase
    .from("profiles")
    .select("full_name, id, birthday");

  const filteredData = data?.filter((profile) => {
    const birthdayDate = parseISO(profile.birthday);
    const birthdayWeek = getWeek(birthdayDate);
    return birthdayWeek === currentWeek;
  });

  return (
    <div>
      <ol className="mt-2 space-y-2 divide-y-base divide-darkGray">
        {filteredData?.length === 0 && <li>No cake this week 😥</li>}
        {filteredData?.map((profile) => (
          <li className="flex justify-between pt-2" key={profile.id}>
            <span>{profile.full_name}</span> <span>{profile.birthday}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
