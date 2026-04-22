import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import { LEGAL_NAV, PRIMARY_NAV } from "../../utils/routes";
import BrandMark from "./BrandMark";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/YoussefDawod",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/youssef-dawod-203273215/",
    Icon: Linkedin,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-t border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <BrandMark />
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Cook like it matters. Entdecke Rezepte cineastisch, koche mit
              geführtem Modus, plane deine Woche.
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Entdecken
            </p>
            <ul className="space-y-2 text-sm">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Folgen
            </p>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] md:flex-row md:items-center">
          <p>© {year} FlavorFind · Cook like it matters.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
