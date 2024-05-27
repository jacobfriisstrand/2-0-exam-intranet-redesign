import React from "react";
import { getPage } from "@/sanity/sanity-utils";
import { fetchTableData } from "@/utils/supabase/supabase-utils";
import EmployeeCard from "@/components/EmployeeCard";
import CreateArticle from "@/components/CreateArticle";
import ArticleCard from "@/components/ArticleCard";
import FileList from "@/components/FileList";
import { CreateFile } from "@/components/CreateFile";
import CreateSingleLineItem from "@/components/CreateSingleLineItem";
import EmployeeAbsence from "@/components/EmployeeAbsence";
import CreateAbsence from "@/components/CreateAbsence";
import SharedLogins from "@/components/SharedLogins";
import DiscountsAndOffers from "@/components/DiscountsAndOffers";
import CreateDiscount from "@/components/CreateDiscount";
import Image from "next/image";

export const revalidate = 0; // Ensure data is re-fetched on every request

export interface Page {
  title: string;
  subheadline: string;
  slug: string;
  image?: string;
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

// Mapping to determine which component to render based on the slug of the page
const componentMapping: { [key: string]: React.FC<any> } = {
  employees: EmployeeCard,
  "news-and-insights": ArticleCard,
  "file-templates": FileList,
  "shared-logins": SharedLogins,
  "town-square": ArticleCard,
  "company-policies": ArticleCard,
  "employee-benefits": ArticleCard,
  "work-environment": ArticleCard,
  "request-forms": FileList,
  "annual-reports": FileList,
  "discounts-and-offers": DiscountsAndOffers,
  creative: ArticleCard,
  ux: ArticleCard,
  performance: ArticleCard,
  "project-management": ArticleCard,
  producers: ArticleCard,
  development: ArticleCard,
  strategy: ArticleCard,
  "employee-absence": EmployeeAbsence,
};

// Mapping to determine whether to render CreateArticle or CreateFile
const creationComponentMapping: {
  [key: string]:
    | "CreateArticle"
    | "CreateFile"
    | "CreateSingleLineItem"
    | "CreateAbsence"
    | "CreateDiscount"
    | undefined;
} = {
  employees: undefined,
  "news-and-insights": "CreateArticle",
  "file-templates": "CreateFile",
  "shared-logins": "CreateSingleLineItem",
  "town-square": "CreateArticle",
  "company-policies": "CreateArticle",
  "employee-benefits": "CreateArticle",
  "work-environment": "CreateArticle",
  "request-forms": "CreateFile",
  "annual-reports": "CreateFile",
  creative: "CreateArticle",
  ux: "CreateArticle",
  performance: "CreateArticle",
  "project-management": "CreateArticle",
  producers: "CreateArticle",
  development: "CreateArticle",
  strategy: "CreateArticle",
  "employee-absence": "CreateAbsence",
  "discounts-and-offers": "CreateDiscount",
};

const articleListStyling =
  "grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5";

const slugToClassNameMapping: { [key: string]: string } = {
  "news-and-insights": articleListStyling,
  "town-square": articleListStyling,
  "company-policies": articleListStyling,
  "employee-benefits": articleListStyling,
  "work-environment": articleListStyling,
  creative: articleListStyling,
  ux: articleListStyling,
  performance: articleListStyling,
  "project-management": articleListStyling,
  producers: articleListStyling,
  development: articleListStyling,
  strategy: articleListStyling,
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
          {page.image && (
            <div className="relative h-[1000px]">
              <Image
                src={page.image}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={page.title}
                className="object-contain"
              />
            </div>
          )}
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
          if (tableName === "bucketName") return null;
          const DynamicComponent = componentMapping[slug];
          const CreationComponent = creationComponentMapping[slug];

          return DynamicComponent ? (
            <React.Fragment key={tableName}>
              <div className={slugToClassNameMapping[slug]}>
                <DynamicComponent
                  baseSlug={slug}
                  data={data[tableName]}
                  bucketName={bucketName}
                  tableName={tableName}
                />
              </div>
              {CreationComponent === "CreateArticle" && (
                <CreateArticle tableName={tableName ?? ""} />
              )}
              {CreationComponent === "CreateFile" && bucketName && (
                <CreateFile bucketName={bucketName ?? ""} />
              )}
              {CreationComponent === "CreateSingleLineItem" && tableName && (
                <CreateSingleLineItem tableName={tableName ?? ""} />
              )}
              {CreationComponent === "CreateAbsence" && (
                <CreateAbsence tableName={tableName ?? ""} />
              )}
              {CreationComponent === "CreateDiscount" && (
                <CreateDiscount tableName={tableName ?? ""} />
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
