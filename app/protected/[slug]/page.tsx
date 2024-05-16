// page.tsx
import React from "react";
import { getPage } from "@/sanity/sanity-utils";

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

export default async function page({ params }: PageProps) {
  const slug = params.slug;
  const page: Page = await getPage(slug);
  return (
    <section>
      <div className="space-y-3">
        <h1 className="font-heading text-step6">{page.title}</h1>
        <p className="text-lightGray">{page.subheadline}</p>
      </div>
    </section>
  );
}
