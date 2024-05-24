import { createClient } from "@/utils/supabase/client";

interface TableMapping {
  tableName?: string;
  query?: string;
  order?: { column: string; ascending: boolean };
  bucketName?: string;
}

interface TableMappingConfig {
  [key: string]: TableMapping[];
}

interface FetchTableDataResult {
  [key: string]: any[] | string | "";
}

export async function fetchTableData(
  slug: string,
): Promise<FetchTableDataResult> {
  const supabase = createClient();

  const tableMapping: TableMappingConfig = {
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
    "file-templates": [
      {
        bucketName: "file_templates",
      },
    ],
    "shared-logins": [
      {
        tableName: "shared_logins",
        query: "*",
        order: { column: "created_at", ascending: false },
      },
    ],
    "town-square": [
      {
        tableName: "town_square",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    "company-policies": [
      {
        tableName: "company_policies",
        query:
          "id, author_id (full_name, avatar_url), title, content, created_at, slug",
        order: { column: "created_at", ascending: false },
      },
    ],
    "employee-benefits": [
      {
        tableName: "employee_benefits",
        query:
          "id, author_id (full_name, avatar_url), title, content, created_at, slug",
        order: { column: "created_at", ascending: false },
      },
    ],
    "work-environment": [
      {
        tableName: "work_environment",
        query:
          "id, author_id (full_name, avatar_url), title, content, created_at, slug",
        order: { column: "created_at", ascending: false },
      },
    ],
    "request-forms": [
      {
        bucketName: "request_forms",
      },
    ],
    "annual-reports": [
      {
        bucketName: "annual_reports",
      },
    ],
    "discounts-and-offers": [
      {
        tableName: "discounts_and_offers",
        query:
          "company, discount_code, info, author_id (full_name), id, created_at, expires_at",
        order: { column: "created_at", ascending: false },
      },
    ],
    creative: [
      {
        tableName: "creative",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    ux: [
      {
        tableName: "ux",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    performance: [
      {
        tableName: "performance",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    "project-management": [
      {
        tableName: "project_management",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    producers: [
      {
        tableName: "producers",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    development: [
      {
        tableName: "development",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    strategy: [
      {
        tableName: "strategy",
        query: `id, author_id (full_name, avatar_url), title, content, created_at, slug`,
        order: { column: "created_at", ascending: false },
      },
    ],
    "employee-absence": [
      {
        tableName: "employee_absence",
        query: `id, user_id (full_name), start_date, end_date, reason, created_at`,
        order: { column: "created_at", ascending: false },
      },
    ],
  };

  const tableQueries = tableMapping[slug];
  if (!tableQueries || tableQueries.length === 0) {
    const errorMessage = `No tables or buckets mapped for slug: ${slug}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const dataPromises = tableQueries.map(
    async ({ tableName, query, order, bucketName }) => {
      if (bucketName) {
        const { data, error } = await supabase.storage.from(bucketName).list();
        if (error) {
          console.error(
            `Error fetching data from bucket ${bucketName}:`,
            error.message,
          );
          throw new Error(error.message);
        }

        return { bucketName, data };
      } else if (tableName && query && order) {
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
      } else {
        const errorMessage = `Invalid configuration for slug: ${slug}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
  );

  const allData = await Promise.all(dataPromises);

  return allData.reduce(
    (acc: FetchTableDataResult, { tableName, bucketName, data }) => {
      if (tableName) {
        acc[tableName] = data;
      } else if (bucketName) {
        acc.bucketName = bucketName;
        acc[bucketName] = data;
      }
      return acc;
    },
    {} as FetchTableDataResult,
  );
}
