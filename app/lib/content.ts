// Unified content layer for the research journal.
//
// The homepage and the article page both read through this module so there is a
// single, consistent notion of "an article" regardless of where it came from:
//   - the shared DB (analyzer_blogpost) — real, externally-published posts, and
//   - the locally-authored editorial archive (./posts.ts).
//
// Junk/placeholder DB rows (e.g. test posts) are filtered out here so the
// landing page only ever shows real content.

import type { Category } from "./posts";
import { CATEGORIES, getAllPosts as getLocalPosts } from "./posts";
import { getPosts as getDbPosts, getPostBySlug as getDbPostBySlug, type BlogRow } from "./blog-db";

export type { Category };
export { CATEGORIES };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO date string, or null when unknown. */
  date: string | null;
  readingTime: number;
  author: string;
  authorRole: string;
  /** Always populated — a real image when available, otherwise a stable cover. */
  imageUrl: string;
  /** Rendered HTML body (DB posts). Mutually exclusive with `body`. */
  contentHtml: string | null;
  /** Ordered paragraphs (local posts). Mutually exclusive with `contentHtml`. */
  body: string[] | null;
  source: "db" | "local";
  /**
   * Whether the post belongs in the research journal's editorial surface.
   * Local archive posts are always on-topic; DB posts qualify only when they
   * declare one of the journal's research categories. Off-topic posts still
   * resolve at their slug (we never 404 real published content) but are kept
   * off the homepage and related rails so the journal stays research-only.
   */
  onTopic: boolean;
}

/** Deterministic, dependency-free cover image keyed by slug. */
function coverFor(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/1200/800`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function hostFrom(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Newsroom";
  }
}

/** Match a free-form DB category string against the journal's categories, if possible. */
function matchCategory(raw: string): Category | null {
  return CATEGORIES.find((c) => c.toLowerCase() === raw.trim().toLowerCase()) ?? null;
}

/**
 * Keep only DB rows that are genuine, publishable content — never placeholder
 * or test rows. This is what stops "dummy" data reaching the landing page.
 */
function isRealDbPost(r: BlogRow): boolean {
  const title = (r.title ?? "").trim();
  if (!title) return false;
  if (/^test\b/i.test(title)) return false;
  if (/\btest (post|backlink)\b/i.test(title)) return false;
  // The list endpoint returns summaries WITHOUT content_html; only enforce the
  // body-length check when a body is actually present (the detail view), so we
  // never drop a legitimate summary row from listings.
  const text = stripHtml(r.content_html ?? "");
  if (text && text.length < 140) return false;
  return true;
}

function dbToArticle(r: BlogRow): Article {
  const text = stripHtml(r.content_html ?? "");
  const matched = matchCategory(r.category ?? "");
  return {
    slug: r.slug,
    title: r.title,
    excerpt: (r.description?.trim() || text).slice(0, 180),
    category: matched ?? "Data Science",
    date: r.published_at,
    readingTime: estimateReadingTime(text),
    author: hostFrom(r.brand_url ?? ""),
    authorRole: "Featured",
    imageUrl: r.image_url?.trim() || coverFor(r.slug),
    contentHtml: r.content_html,
    body: null,
    source: "db",
    onTopic: matched !== null,
  };
}

function localToArticle(p: ReturnType<typeof getLocalPosts>[number]): Article {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    readingTime: p.readingTime,
    author: p.author,
    authorRole: p.authorRole,
    imageUrl: coverFor(p.slug),
    contentHtml: null,
    body: p.body,
    source: "local",
    onTopic: true,
  };
}

function timeOf(date: string | null): number {
  return date ? new Date(date).getTime() || 0 : 0;
}

/** Every article, newest first. Real DB posts take precedence over local on slug clash. */
export async function getArticles(): Promise<Article[]> {
  const dbRows = (await getDbPosts()).filter(isRealDbPost);
  const dbArticles = dbRows.map(dbToArticle);
  const seen = new Set(dbArticles.map((a) => a.slug));

  const localArticles = getLocalPosts()
    .map(localToArticle)
    .filter((a) => !seen.has(a.slug));

  return [...dbArticles, ...localArticles].sort((a, b) => timeOf(b.date) - timeOf(a.date));
}

/** Articles shown in the journal's editorial surface (homepage, rails) — research-only. */
export async function getJournalArticles(): Promise<Article[]> {
  return (await getArticles()).filter((a) => a.onTopic);
}

/** Resolve a single article by slug — DB first (real published), then local archive. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const dbRow = await getDbPostBySlug(slug);
  if (dbRow && isRealDbPost(dbRow)) return dbToArticle(dbRow);

  const local = getLocalPosts().find((p) => p.slug === slug);
  return local ? localToArticle(local) : null;
}

export function articlesByCategory(articles: Article[], category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

/** Stable in-page anchor id for a category section, e.g. "AI & ML" -> "cat-ai-ml". */
export function categoryAnchor(category: Category): string {
  return "cat-" + category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Stable date formatter — no locale/clock drift between server and client. */
export function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
