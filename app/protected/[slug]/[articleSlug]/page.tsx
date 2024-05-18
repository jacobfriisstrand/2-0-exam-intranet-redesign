import { createClient } from "@/utils/supabase/server";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
export interface Page {
  title: string;
  subheadline: string;
  slug: string;
}

type PageProps = {
  params: {
    slug: string;
    articleSlug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const supabase = createClient();

  const { data: article, error } = await supabase
    .from("news")
    .select("title, content, created_at, author_id (full_name, avatar_url)")
    .eq("slug", params.articleSlug)
    .single();

  const { data: avatarData } = supabase.storage
    .from("avatars")
    .getPublicUrl(article?.author_id.avatar_url);

  console.log(params);

  return (
    <article className="mx-auto max-w-prose space-y-7">
      <h1 className="font-heading text-step6">{article?.title}</h1>
      <div className="flex place-items-center gap-3 ">
        <div className="relative size-14">
          <Image
            src={avatarData.publicUrl}
            alt="Avatar"
            placeholder="blur"
            blurDataURL={avatarData.publicUrl}
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33%"
            className="rounded-full aspect-square object-cover"
          />
        </div>
        <div>
          <p>{article?.author_id.full_name}</p>
          <p className="text-lightGray">
            {format(new Date(article?.created_at), "yyyy-MM-dd")}
          </p>
          <p className="text-lightGray">
            {format(new Date(article?.created_at), "p")}
          </p>
        </div>
      </div>
      <hr className="border-darkGray" />
      <p>{article?.content}</p>
    </article>
  );
}
