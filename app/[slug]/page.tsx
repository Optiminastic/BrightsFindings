import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { GridCard } from "@/app/components/ArticleCard";
import {
  getArticles,
  getJournalArticles,
  getArticleBySlug,
  articlesByCategory,
  formatDate,
} from "@/app/lib/content";

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found" };
  return { title: `${article.title} — First Principles`, description: article.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // Related: same category from the research journal, excluding the current article.
  const all = await getJournalArticles();
  const related = articlesByCategory(all, article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8">
          <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-accent">
            ← Back to all articles
          </Link>

          <header className="mt-8 border-b border-line pb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              {article.category}
            </p>
            <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>
            ) : null}
            <p className="mt-6 text-sm text-ink-faint">
              by <span className="text-ink-soft">{article.author}</span>
              {article.authorRole ? <span className="text-ink-faint">, {article.authorRole}</span> : null}
              {article.date ? <> · {formatDate(article.date)}</> : null}
              {article.readingTime ? <> · {article.readingTime} min read</> : null}
            </p>
          </header>

          {article.imageUrl ? (
            <div className="mt-8 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.imageUrl} alt={article.title} className="aspect-[16/9] w-full object-cover" />
            </div>
          ) : null}

          {/* DB posts ship HTML; local archive posts ship ordered paragraphs. */}
          {article.contentHtml ? (
            <div
              className="mt-10 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <div className="mt-10">
              {(article.body ?? []).map((para, i) => (
                <p
                  key={i}
                  className={`text-lg leading-relaxed text-ink-soft ${
                    i === 0
                      ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ink"
                      : "mt-6"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          )}
        </article>

        {related.length > 0 ? (
          <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            <div className="flex items-end justify-between border-b-2 border-ink pb-2">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                More in {article.category}
              </h2>
              <Link href="/" className="text-xs font-medium text-ink-faint transition-colors hover:text-accent">
                View all »
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {related.map((a) => (
                <GridCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
