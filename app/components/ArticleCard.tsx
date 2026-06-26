import Link from "next/link";
import type { Article } from "@/app/lib/content";
import { formatDate } from "@/app/lib/content";

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
      {category}
    </span>
  );
}

/* eslint-disable @next/next/no-img-element */
function Cover({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${className ?? ""}`}
    />
  );
}

/** Big lead story — image, category, oversized serif headline, dek, byline. */
export function LeadCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/${article.slug}`} className="block overflow-hidden">
        <Cover src={article.imageUrl} alt={article.title} className="aspect-[16/10] w-full" />
      </Link>
      <div className="mt-5">
        <CategoryTag category={article.category} />
        <Link href={`/${article.slug}`}>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-accent-deep sm:text-4xl">
            {article.title}
          </h2>
        </Link>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{article.excerpt}</p>
        <p className="mt-5 text-sm text-ink-faint">
          by <span className="text-ink-soft">{article.author}</span>
          {article.date ? <> · {formatDate(article.date)}</> : null}
        </p>
      </div>
    </article>
  );
}

/** Medium stacked card — image on top, category + title + date. */
export function StackCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col border-b border-line pb-6 last:border-0 last:pb-0">
      <Link href={`/${article.slug}`} className="block overflow-hidden">
        <Cover src={article.imageUrl} alt={article.title} className="aspect-[16/9] w-full" />
      </Link>
      <div className="mt-4">
        <Link href={`/${article.slug}`}>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 text-xs uppercase tracking-wide text-ink-faint">
          {article.category}
          {article.date ? <> · {formatDate(article.date)}</> : null}
        </p>
      </div>
    </article>
  );
}

/** Compact headline with a one-line dek — for the right-hand list rail. */
export function HeadlineItem({ article }: { article: Article }) {
  return (
    <article className="group border-b border-line pb-5 last:border-0 last:pb-0">
      <Link href={`/${article.slug}`}>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
      {article.date ? (
        <p className="mt-2 text-xs text-ink-faint">{formatDate(article.date)}</p>
      ) : null}
    </article>
  );
}

/** Small grid card — image, title, date. Used in the dense category grids. */
export function GridCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/${article.slug}`} className="block overflow-hidden">
        <Cover src={article.imageUrl} alt={article.title} className="aspect-[4/3] w-full" />
      </Link>
      <Link href={`/${article.slug}`}>
        <h3 className="font-display mt-3 text-base font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {article.title}
        </h3>
      </Link>
      <p className="mt-1.5 text-xs uppercase tracking-wide text-ink-faint">
        {article.date ? formatDate(article.date) : article.category}
      </p>
    </article>
  );
}

/** Card with image on top, title, excerpt and byline — for the 3-up feature row. */
export function FeatureCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/${article.slug}`} className="block overflow-hidden">
        <Cover src={article.imageUrl} alt={article.title} className="aspect-[16/10] w-full" />
      </Link>
      <Link href={`/${article.slug}`}>
        <h3 className="font-display mt-4 text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
      <p className="mt-3 text-xs text-ink-faint">
        by <span className="text-ink-soft">{article.author}</span>
        {article.date ? <> · {formatDate(article.date)}</> : null}
      </p>
    </article>
  );
}

/** Text-only headline with byline — minimal list rail. */
export function MiniHeadline({ article }: { article: Article }) {
  return (
    <article className="group border-b border-line pb-4 last:border-0 last:pb-0">
      <Link href={`/${article.slug}`}>
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {article.title}
        </h3>
      </Link>
      <p className="mt-1 text-xs text-ink-faint">by {article.author}</p>
    </article>
  );
}
