import type { Article } from "@/app/lib/content";
import { LeadCard, StackCard, HeadlineItem } from "./ArticleCard";

/**
 * The magazine hero: a large lead story, two stacked mid stories, and a rail of
 * compact headlines — mirroring the reference layout's top block.
 */
export default function Featured({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;
  const stack = rest.slice(0, 2);
  const rail = rest.slice(2, 6);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <LeadCard article={lead} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-3">
          {stack.map((a) => (
            <StackCard key={a.slug} article={a} />
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-line pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {rail.map((a) => (
            <HeadlineItem key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
