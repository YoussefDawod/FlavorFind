import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { PRIMARY_NAV } from "../../utils/routes";
import { cn } from "../../utils/cn";
import BrandMark from "./BrandMark";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import MobileDrawer from "./MobileDrawer";

/**
 * Header — sticky, mit Glasmorphismus-Hintergrund beim Scrollen.
 * Desktop: Brand + horizontale Nav + ThemeToggle.
 * Mobile: Brand + ThemeToggle + Hamburger → öffnet MobileDrawer.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/75 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <BrandMark />

          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {PRIMARY_NAV.map((item) => (
              <NavItem key={item.to} to={item.to}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Menü öffnen"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
                "border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur",
                "text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent-soft)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
              )}
            >
              <Menu size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
