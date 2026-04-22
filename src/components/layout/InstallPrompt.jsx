import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Share, X } from "lucide-react";
import Button from "../ui/Button";
import { usePwaInstall } from "../../hooks/usePwaInstall";

const DISMISS_KEY = "flavorfind:install-dismissed";

/**
 * Schwebender Install-Banner. Erscheint verzögert, merkt sich Dismiss
 * in sessionStorage (pro Tab-Sitzung) und zeigt iOS-spezifische Anweisung.
 */
export default function InstallPrompt() {
  const { canInstall, isIosStandaloneCapable, isStandalone, promptInstall } =
    usePwaInstall();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone) return undefined;
    if (typeof window === "undefined") return undefined;
    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* privacy-mode: nichts zu tun */
    }
    if (dismissed) return undefined;

    const timer = window.setTimeout(() => {
      if (canInstall || isIosStandaloneCapable) setVisible(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [canInstall, isIosStandaloneCapable, isStandalone]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted" || outcome === "dismissed") setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-label="App installieren"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-2xl border border-accent/40 bg-surface-elevated/95 p-4 shadow-glow backdrop-blur sm:inset-x-auto sm:right-6"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Download className="size-5" aria-hidden="true" />
            </span>
            <div className="flex-1 text-sm">
              <p className="font-serif text-base text-text">
                FlavorFind installieren
              </p>
              {isIosStandaloneCapable ? (
                <p className="mt-1 text-text-secondary">
                  Tippe auf{" "}
                  <span className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-xs">
                    <Share className="size-3" aria-hidden="true" />
                    Teilen
                  </span>{" "}
                  und wähle{" "}
                  <span className="whitespace-nowrap rounded bg-surface px-1.5 py-0.5 text-xs">
                    Zum Home-Bildschirm
                  </span>
                  .
                </p>
              ) : (
                <p className="mt-1 text-text-secondary">
                  Schnellzugriff, Offline-Modus und ein eigenes App-Icon.
                </p>
              )}
              {!isIosStandaloneCapable ? (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={handleInstall}>
                    Installieren
                  </Button>
                  <Button size="sm" variant="ghost" onClick={dismiss}>
                    Später
                  </Button>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Install-Hinweis schließen"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
