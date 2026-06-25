import Link from "next/link";
import { getPosts, formatDate } from "@/app/lib/blog-db";

/** Latest published blogs (from the shared DB) shown at the top of the homepage. */
export default async function LatestFromBlog() {
  const posts = (await getPosts()).slice(0, 4);
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-12 sm:px-8">
      <div className="flex items-end justify-between border-b border-line pb-3">
        <h2 className="font-display text-2xl font-semibold text-ink">Latest articles</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((p) => (
          <Link key={p.id} href={`/${p.slug}`} className="group block">
            {p.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image_url}
                alt={p.title}
                className="mb-3 aspect-[16/10] w-full rounded-lg object-cover"
              />
            ) : null}
            <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-accent">
              {p.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-ink-faint">
              {formatDate(p.published_at)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
