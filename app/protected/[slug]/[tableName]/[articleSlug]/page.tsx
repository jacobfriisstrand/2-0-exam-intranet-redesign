import { createClient } from "@/utils/supabase/client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";

type PageProps = {
  params: {
    slug: string;
    articleSlug: string;
    tableName: string;
  };
};

export default async function Page({ params }: PageProps) {
  console.log(params);

  const supabase = createClient();

  const { data: article, error } = await supabase
    .from(params.tableName)
    .select(
      "id, author_id (full_name, avatar_url), title, content, created_at, slug",
    )
    .eq("slug", params.articleSlug)
    .single();

  const { data: avatarData } = supabase.storage
    .from("avatars")
    // @ts-ignore
    .getPublicUrl(article?.author_id.avatar_url);

  return (
    <article className="mx-auto max-w-prose space-y-7">
      <h1 className="font-heading text-step3 lg:text-step6">
        {article?.title}
      </h1>
      <div className="flex place-items-center gap-3 ">
        <div className="relative size-12">
          <Image
            src={avatarData.publicUrl}
            alt="Avatar"
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33%"
            className="aspect-square rounded-full object-cover"
          />
        </div>
        <div className="text-baseSmall">
          {/* @ts-ignore */}
          <p>{article?.author_id.full_name}</p>
          <p className="text-lightGray">
            {format(new Date(article?.created_at), "PPP")}
          </p>
          <p className="text-lightGray">
            {format(new Date(article?.created_at), "p")}
          </p>
        </div>
      </div>
      <hr className="border-darkGray" />
      <p className="whitespace-break-spaces">{article?.content}</p>
    </article>
  );
}
