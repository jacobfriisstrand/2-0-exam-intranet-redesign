// page.tsx
import React from "react";
import { getPage } from "@/sanity/sanity-utils";
import { fetchTableData } from "@/utils/supabase/supabase-utils";
import EmployeeCard from "@/components/EmployeeCard";
// import other components as needed

// Define the Page interface
export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const slug = params.slug;
  const page: Page = await getPage(slug);

  let data;
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
    // add other mappings
  };

  const DynamicComponent = componentMapping[slug];

  return (
    <section>
      <div className="space-y-3">
        <h1 className="font-heading text-step6">{page.title}</h1>
        <p className="text-lightGray">{page.subheadline}</p>
      </div>
      <div className="mt-10">
        {DynamicComponent ? (
          <DynamicComponent data={data} />
        ) : (
          <p>No component found for this slug.</p>
        )}
      </div>
    </section>
  );
}
