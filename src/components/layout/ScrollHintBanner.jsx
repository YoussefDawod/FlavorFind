import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

const DISMISS_KEY = "flavorfind:scroll-hint-dismissed";

/**
 * Dezenter Hinweis-Banner, der erst nach dem ersten Scroll-Ereignis
 * eingeblendet wird. Informiert über lokale Speicherung (localStorage)
 * und verweist auf die Datenschutz-Seite. Einmal geschlossen, bleibt
 * der Banner dauerhaft unsichtbar (persistiert in localStorage).
 */
export default function ScrollHintBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      /* kein Storage verfügbar → Banner trotzdem zeigen */
    }

    let triggered = false;
    function onScroll() {
      if (triggered) return;
      if (window.scrollY <= 24) return;
      triggered = true;
      window.removeEventListener("scroll", onScroll);
      setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Hinweis zur Datenspeicherung"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-start gap-3 rounded-2xl border border-border bg-surface-elevated/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur sm:inset-x-auto sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
        >
          <Info
            className="mt-0.5 size-4 shrink-0 text-accent"
            aria-hidden="true"
          />
          <p className="flex-1 text-sm leading-relaxed text-text-secondary">
            Hinweis: FlavorFind nutzt{" "}
            <strong className="text-text">keine Tracking-Cookies</strong>.
            Favoriten, Wochenplan und Theme werden ausschließlich lokal in
            deinem Browser gespeichert. Details in der{" "}
            <a
              href="/datenschutz"
              className="text-accent underline underline-offset-2 hover:text-accent/80"
            >
              Datenschutzerklärung
            </a>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hinweis schließen"
            className="-m-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-text-muted transition hover:bg-surface hover:text-text"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
