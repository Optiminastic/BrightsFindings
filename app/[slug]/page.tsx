import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getPosts, getPostBySlug, formatDate } from "@/app/lib/blog-db";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
          <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
            ← Home
          </Link>
          <header className="mt-8 border-b border-line pb-10">
            <time className="text-xs uppercase tracking-wide text-ink-faint">
              {formatDate(post.published_at)}
            </time>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            ) : null}
          </header>
          {post.image_url ? (
            <div className="mt-10 overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image_url} alt={post.title} className="w-full object-cover" />
            </div>
          ) : null}
          <div
            className="mt-10 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
