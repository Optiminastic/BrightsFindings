import Header from "@/app/components/Header";
import Featured from "@/app/components/Featured";
import CategoryRow from "@/app/components/CategoryRow";
import Footer from "@/app/components/Footer";
import { getArticles, articlesByCategory, CATEGORIES } from "@/app/lib/content";

export const revalidate = 300;

// Variant per category, tuned to how many articles each one carries — gives the
// homepage the varied rhythm of the reference magazine layout.
const VARIANTS = {
  "AI & ML": "split",
  Neuroscience: "feature",
  Physics: "grid",
  Climate: "feature",
  Biology: "grid",
  "Data Science": "split",
} as const;

export default async function Home() {
  // All articles, newest first — freshly published Signalor (DB) posts sort to
  // the top, so they lead the featured block. Category sections stay research-only.
  const all = await getArticles();
  const journal = all.filter((a) => a.onTopic);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Featured articles={all.slice(0, 7)} />
        {CATEGORIES.map((cat) => (
          <CategoryRow
            key={cat}
            category={cat}
            articles={articlesByCategory(journal, cat)}
            variant={VARIANTS[cat]}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
