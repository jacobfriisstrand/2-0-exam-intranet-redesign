import React from "react";
import { getPage } from "@/sanity/sanity-utils";
import { fetchTableData } from "@/utils/supabase/supabase-utils";
import EmployeeCard from "@/components/EmployeeCard";
import CreateArticle from "@/components/CreateArticle";
import ArticleCard from "@/components/ArticleCard";

export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

export interface TableData {
  [key: string]: any[]; // Replace `any` with a more specific type if possible
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  const page: Page = await getPage(slug);

  let data: TableData;
  try {
    data = await fetchTableData(slug);
  } catch (error) {
    console.error("Error fetching table data:", error);
    return (
      <section>
        <div className="space-y-3">
          <h1 className="font-heading text-step6">{page.title}</h1>
          <p className="text-lightGray">{page.subheadline}</p>
        </div>
      </section>
    );
  }

  // Map slugs to components
  const componentMapping: { [key: string]: React.FC<any> } = {
    employees: EmployeeCard,
    "news-and-insights": ArticleCard,

    // add other mappings
  };

  return (
    <section>
      <div className="space-y-3">
        <h1 className="font-heading text-step6">{page.title}</h1>
        <p className="text-lightGray">{page.subheadline}</p>
      </div>
      <div className="mt-10">
        {Object.keys(data).map((tableName) => {
          const DynamicComponent = componentMapping[slug];
          return DynamicComponent ? (
            <>
              <DynamicComponent
                key={tableName}
                baseSlug={slug}
                data={data[tableName]}
              />
              <CreateArticle />
            </>
          ) : (
            <p key={tableName}>No component found for this slug.</p>
          );
        })}
      </div>
    </section>
  );
}
