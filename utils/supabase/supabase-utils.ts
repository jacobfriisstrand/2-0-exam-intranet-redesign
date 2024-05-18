// utils/supabase/server.ts
import { createClient } from "@/utils/supabase/server";

export async function fetchTableData(slug: string) {
  const supabase = createClient();

  const tableMapping: {
    [key: string]: {
      tableName: string;
      query: string;
      order: { column: string; ascending: boolean };
    }[];
  } = {
    employees: [
      {
        tableName: "profiles",
        query: "*",
        order: { column: "full_name", ascending: true },
      },
    ],
    "news-and-insights": [
      {
        tableName: "news",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
  };

  const tableQueries = tableMapping[slug];
  if (!tableQueries || tableQueries.length === 0) {
    const errorMessage = `No tables mapped for slug: ${slug}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const dataPromises = tableQueries.map(async ({ tableName, query, order }) => {
    const { data, error } = await supabase
      .from(tableName)
      .select(query)
      .order(order.column, { ascending: order.ascending });
    if (error) {
      console.error(
        `Error fetching data from table ${tableName}:`,
        error.message,
      );
      throw new Error(error.message);
    }

    const dataWithAvatars = await Promise.all(
      data.map(async (item: any) => {
        if (item.avatar_url) {
          const { data: avatarData } = supabase.storage
            .from("avatars")
            .getPublicUrl(item.avatar_url);

          return {
            ...item,
            avatar_url: avatarData.publicUrl,
          };
        }
        if (item.author_id?.avatar_url) {
          const { data: avatarData } = supabase.storage
            .from("avatars")
            .getPublicUrl(item.author_id.avatar_url);

          return {
            ...item,
            author_id: {
              ...item.author_id,
              avatar_url: avatarData.publicUrl,
            },
          };
        }
        return item;
      }),
    );

    return { tableName, data: dataWithAvatars };
  });

  const allData = await Promise.all(dataPromises);

  return allData.reduce(
    (acc, { tableName, data }) => {
      acc[tableName] = data;
      return acc;
    },
    {} as { [key: string]: any[] },
  );
}
