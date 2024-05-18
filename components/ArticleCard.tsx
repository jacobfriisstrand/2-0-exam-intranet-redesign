import { NewsArticle } from "@/app/interfaces";
import { format } from "date-fns";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: NewsArticle[];
  baseSlug: string;
};

const ArticleCard: React.FC<Props> = ({ data, baseSlug }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5">
      {data.map((article) => (
        <Link
          key={article.id}
          className="group"
          href={`${process.env.BASE_URL}/${baseSlug}/${article.slug}`}
        >
          <article className="flex h-full flex-col gap-4 rounded-base border-base border-darkGray bg-black p-5 drop-shadow-base transition-all group-hover:scale-[0.99] group-hover:border-accent motion-reduce:transition-none">
            <h2 className="line-clamp-2 font-heading text-step1">
              {article.title}
            </h2>
            <div className="space-y-1">
              <div className="flex place-items-center gap-2">
                <div className="relative size-6">
                  <Image
                    src={article.author_id?.avatar_url}
                    alt={article.author_id?.full_name}
                    placeholder="blur"
                    blurDataURL={article.author_id?.avatar_url}
                    fill
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33%"
                    className="rounded-full aspect-square object-cover"
                  />
                </div>
                <p>{article.author_id?.full_name}</p>
              </div>
              <p>{format(new Date(article.created_at), "yyyy-MM-dd")}</p>
              <p>{format(new Date(article.created_at), "p")}</p>
            </div>
            <hr className="border-darkGray" />
            <p className="line-clamp-5">{article.content}</p>
            <MdOutlineArrowOutward className="mt-auto size-5 transition-[transform_colors] group-hover:translate-x-2 group-hover:text-accent" />
          </article>
        </Link>
      ))}
    </div>
  );
};

export default ArticleCard;
