// Renders a JSON-LD structured-data block. Search engines read this to build
// rich results (site name box, article/author/publisher metadata). Kept as a
// tiny reusable server component so any page can drop in a schema object.

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
