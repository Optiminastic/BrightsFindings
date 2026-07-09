import Link from "next/link";
import { CATEGORIES, categoryAnchor } from "@/app/lib/content";

const SECTIONS = [
  { title: "Journal", links: ["About", "Editorial standards", "Contributors", "Archive"] },
  { title: "Connect", links: ["Newsletter", "RSS", "Mastodon", "Contact"] },
];

export default function Footer() {
  return (
    <footer id="subscribe" className="mt-16 border-t border-line">
      {/* Newsletter band */}
      <div id="about" className="border-b border-line bg-paper-raised">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              The week in research, every Sunday.
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              One careful email. No noise, no hype — just the work that matters.
            </p>
          </div>
          <form className="flex w-full max-w-sm items-center gap-2" action="/#subscribe">
            <input
              type="email"
              required
              placeholder="you@institution.edu"
              aria-label="Email address"
              className="h-11 w-full rounded-sm border border-line bg-paper px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-sm bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-xl font-bold tracking-tight text-ink">Brights Findings</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            An independent research journal connecting the dots between disciplines.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">Topics</h3>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/#${categoryAnchor(cat)}`}
                  className="text-sm text-ink-soft transition-colors hover:text-accent"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">{section.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {section.links.map((link) => (
                <li key={link}>
                  <Link href="/#subscribe" className="text-sm text-ink-soft transition-colors hover:text-accent">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Brights Findings. All rights reserved.</span>
          <span>Set in Fraunces &amp; Inter.</span>
        </div>
      </div>
    </footer>
  );
}
