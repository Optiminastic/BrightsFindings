import type { MetadataRoute } from "next";
import { getArticles } from "@/app/lib/content";

const SITE_URL = "https://brightsfindings.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  };

  // Enumerate every real article (local archive + DB). A failed DB/network
  // fetch must never break the build, so fall back to just the homepage.
  let articles: MetadataRoute.Sitemap = [];
  try {
    const all = await getArticles();
    articles = all.map((a) => ({
      url: `${SITE_URL}/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("[sitemap] failed to enumerate articles:", e);
  }

  return [home, ...articles];
}
