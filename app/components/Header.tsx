import Link from "next/link";

export default function Header() {
  const nav = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-sm">
      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <Link href="/" className="group leading-none">
          <span className="font-display block text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            First&nbsp;Principles
          </span>
          <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            A Clean &amp; Minimal Research Journal
          </span>
        </Link>

        <Link
          href="/#subscribe"
          className="rounded-sm bg-ink px-4 py-1.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep"
        >
          Subscribe
        </Link>
      </div>

      {/* Navigation strip */}
      <div className="border-y border-line">
        <nav className="mx-auto flex max-w-7xl items-center px-5 sm:px-8">
          <ul className="-mb-px flex items-center gap-6 overflow-x-auto py-3 text-sm">
            {nav.map((item) => (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className="border-b-2 border-transparent pb-3 font-medium text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
