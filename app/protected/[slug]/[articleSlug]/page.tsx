import React from "react";

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
  console.log(params);
  return <p>Article: {params.slug}</p>;
}
