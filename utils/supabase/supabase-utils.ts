// supabase-utils.ts
import { createClient } from "@/utils/supabase/server";

export async function fetchTableData(slug: string) {
  const supabase = createClient();
  // Map slugs to table names
  const tableMapping: { [key: string]: string } = {
    employees: "profiles",
    // add other mappings
  };

  const tableName = tableMapping[slug];
  if (!tableName) {
    throw new Error(`No table mapped for slug: ${slug}`);
  }

  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    throw new Error(error.message);
  }

  // Fetch public URLs for avatar images
  const dataWithAvatars = await Promise.all(
    data.map(async (item: any) => {
      if (item.avatar_url) {
        const { data: avatarData } = supabase.storage
          .from("avatars")
          .getPublicUrl(item.avatar_url);
        return { ...item, avatar_url: avatarData.publicUrl };
      }
      console.log(data);
      return item;
    }),
  );

  return dataWithAvatars;
}
