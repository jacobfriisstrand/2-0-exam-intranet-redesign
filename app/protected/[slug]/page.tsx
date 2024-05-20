import React from "react";
import { getPage } from "@/sanity/sanity-utils";
import { fetchTableData } from "@/utils/supabase/supabase-utils";
import EmployeeCard from "@/components/EmployeeCard";
import CreateArticle from "@/components/CreateArticle";
import ArticleCard from "@/components/ArticleCard";
import FileList from "@/components/FileList";
import { CreateFile } from "@/components/CreateFile";
import SingleLineList from "@/components/SingleLineList";
import CreateSingleLineItem from "@/components/CreateSingleLineItem";

export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

export interface TableData {
  [key: string]: any[] | string | undefined;
  bucketName?: string | undefined;
  tableName?: string | undefined;
}

type PageProps = {
  params: {
    slug: string;
  };
};

const componentMapping: { [key: string]: React.FC<any> } = {
  employees: EmployeeCard,
  "news-and-insights": ArticleCard,
  "file-templates": FileList,
  "shared-logins": SingleLineList,
  "town-square": ArticleCard,
  "company-policies": ArticleCard,
  // add other mappings
};

// Mapping to determine whether to render CreateArticle or CreateFile
const creationComponentMapping: {
  [key: string]:
    | "CreateArticle"
    | "CreateFile"
    | "CreateSingleLineItem"
    | undefined;
} = {
  employees: undefined,
  "news-and-insights": "CreateArticle",
  "file-templates": "CreateFile",
  "shared-logins": "CreateSingleLineItem",
  "town-square": "CreateArticle",
  "company-policies": "CreateArticle",
  // add other mappings
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

  const bucketName = data.bucketName;

  return (
    <section>
      <div className="space-y-3">
        <h1 className="font-heading text-step6">{page.title}</h1>
        <p className="text-lightGray">{page.subheadline}</p>
      </div>
      <div className="mt-10">
        {Object.keys(data).map((tableName) => {
          if (tableName === "bucketName") return null; // Skip bucketName key
          const DynamicComponent = componentMapping[slug];
          const CreationComponent = creationComponentMapping[slug];

          return DynamicComponent ? (
            <React.Fragment key={tableName}>
              <DynamicComponent
                baseSlug={slug}
                data={data[tableName]}
                bucketName={bucketName}
                tableName={tableName}
              />
              {CreationComponent === "CreateArticle" && (
                <CreateArticle tableName={tableName ?? ""} />
              )}
              {CreationComponent === "CreateFile" && bucketName && (
                <CreateFile bucketName={bucketName ?? ""} />
              )}
              {CreationComponent === "CreateSingleLineItem" && tableName && (
                <CreateSingleLineItem tableName={tableName ?? ""} />
              )}
            </React.Fragment>
          ) : (
            <p key={tableName}>No component found for this slug.</p>
          );
        })}
      </div>
    </section>
  );
}
