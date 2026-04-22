import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, X } from "lucide-react";
import { isRuntimeMocksEnabled } from "../../utils/api/client";

const DISMISS_KEY = "flavorfind:demo-banner-dismissed";

/**
 * Banner, das erscheint, sobald der API-Client zur Laufzeit auf Mock-Daten
 * umschaltet (z. B. nach 402 Quota oder 401/403). Einmaliges Schließen wird
 * in `sessionStorage` gespeichert.
 */
export default function DemoModeBanner() {
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState(null);

  useEffect(() => {
    function sync(detailReason) {
      try {
        if (window.sessionStorage.getItem(DISMISS_KEY) === "1") return;
      } catch {
        /* ignore */
      }
      setReason(detailReason ?? null);
      setVisible(true);
    }

    if (isRuntimeMocksEnabled()) sync();

    function onEnabled(e) {
      sync(e.detail?.reason);
    }
    window.addEventListener("flavorfind:mocks-enabled", onEnabled);
    return () =>
      window.removeEventListener("flavorfind:mocks-enabled", onEnabled);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const message =
    reason === "unauthorized"
      ? "API-Key nicht autorisiert — Demo-Daten aktiv."
      : "API-Kontingent erschöpft — Demo-Daten aktiv.";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="sticky top-0 z-40 flex items-center justify-center gap-3 border-b border-accent/30 bg-accent-soft px-4 py-2 text-xs text-accent"
        >
          <FlaskConical className="size-3.5" aria-hidden="true" />
          <span>{message} Alle Rezepte sind kuratierte Beispiele.</span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Banner schließen"
            className="ml-2 inline-flex size-5 items-center justify-center rounded-full text-accent transition hover:bg-accent/15"
          >
            <X className="size-3" aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
