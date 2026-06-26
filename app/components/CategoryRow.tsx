import Link from "next/link";
import type { Article, Category } from "@/app/lib/content";
import { categoryAnchor, formatDate } from "@/app/lib/content";
import { GridCard, FeatureCard, MiniHeadline } from "./ArticleCard";

type Variant = "grid" | "feature" | "split";

function SectionHeader({ category }: { category: Category }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-2">
      <h2 className="font-display text-xl font-bold tracking-tight text-ink">{category}</h2>
      <Link
        href={`/#${categoryAnchor(category)}`}
        className="text-xs font-medium text-ink-faint transition-colors hover:text-accent"
      >
        View all »
      </Link>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
function SplitFeature({ articles }: { articles: Article[] }) {
  const [lead, ...rest] = articles;
  const image = rest[0];
  const list = rest.slice(1, 5);

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          {lead.category}
          {lead.date ? <span className="text-ink-faint"> · {formatDate(lead.date)}</span> : null}
        </p>
        <Link href={`/${lead.slug}`} className="group">
          <h3 className="font-display mt-3 text-3xl font-semibold leading-[1.08] tracking-tight text-ink transition-colors group-hover:text-accent-deep">
            {lead.title}
          </h3>
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{lead.excerpt}</p>
        <Link
          href={`/${lead.slug}`}
          className="mt-6 inline-flex rounded-sm border border-ink px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Read More
        </Link>
      </div>

      {image ? (
        <Link href={`/${image.slug}`} className="group block overflow-hidden lg:col-span-4">
          <img
            src={image.imageUrl}
            alt={image.title}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>
      ) : null}

      <div className="flex flex-col gap-4 lg:col-span-4">
        {list.map((a) => (
          <MiniHeadline key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}

export default function CategoryRow({
  category,
  articles,
  variant = "grid",
}: {
  category: Category;
  articles: Article[];
  variant?: Variant;
}) {
  if (articles.length === 0) return null;

  return (
    <section id={categoryAnchor(category)} className="mx-auto max-w-7xl px-5 py-10 sm:px-8 scroll-mt-28">
      <SectionHeader category={category} />

      {variant === "grid" && (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {articles.slice(0, 8).map((a) => (
            <GridCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {variant === "feature" && (
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <FeatureCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {variant === "split" && <SplitFeature articles={articles} />}
    </section>
  );
}
