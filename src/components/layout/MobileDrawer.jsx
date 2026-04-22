import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PRIMARY_NAV, LEGAL_NAV } from "../../utils/routes";
import { cn } from "../../utils/cn";
import NavItem from "./NavItem";
import BrandMark from "./BrandMark";

/**
 * MobileDrawer — Vollflächiger Slide-In von rechts auf Mobile.
 * - Body-Scroll-Lock während offen
 * - Escape + Klick-auf-Overlay schließt
 * - Fokus wandert auf Close-Button beim Öffnen (einfacher Focus-Trap via tabindex-Grenzen)
 */
export default function MobileDrawer({ open, onClose }) {
  const closeButtonRef = useRef(null);

  // Body-Scroll-Lock
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Escape schließt
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Fokus auf Close-Button beim Öffnen
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Hauptnavigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Menü schließen"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "absolute inset-0 h-full w-full cursor-default",
              "bg-[var(--color-overlay)] backdrop-blur-sm",
            )}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 top-0 flex h-full w-[min(380px,100%)] flex-col",
              "border-l border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]",
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
              <BrandMark />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Menü schließen"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-[var(--color-border)] text-[var(--color-text)]",
                  "transition-colors hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent-soft)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                )}
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <nav
              aria-label="Hauptnavigation mobile"
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              <ul className="flex flex-col gap-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.to}>
                    <NavItem to={item.to} variant="vertical" onClick={onClose}>
                      {item.label}
                    </NavItem>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-[var(--color-border)] px-4 py-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-text-muted)]">
                {LEGAL_NAV.map((item) => (
                  <li key={item.to}>
                    <NavItem to={item.to} variant="vertical" onClick={onClose}>
                      {item.label}
                    </NavItem>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
