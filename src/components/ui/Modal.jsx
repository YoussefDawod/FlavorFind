import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import IconButton from "./IconButton";

/**
 * Zugänglicher Modal-Dialog mit Framer-Motion-Animation,
 * Body-Scroll-Lock, Fokus-Rückgabe und Escape-Close.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
  hideCloseButton = false,
}) {
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastFocusedRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => {
      const node = panelRef.current;
      if (node) {
        const focusable = node.querySelector(
          "[autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        );
        (focusable ?? node).focus?.();
      }
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      cancelAnimationFrame(raf);
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus?.();
      }
    };
  }, [open, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Dialog schließen"
            onClick={onClose}
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-desc" : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-3xl border border-border-strong bg-surface-elevated shadow-soft",
              sizes[size] ?? sizes.md,
              className,
            )}
          >
            {(title || !hideCloseButton) && (
              <div className="flex items-start justify-between gap-4 border-b border-border px-6 pt-5 pb-4">
                <div className="min-w-0">
                  {title ? (
                    <h2
                      id="modal-title"
                      className="font-serif text-xl text-text"
                    >
                      {title}
                    </h2>
                  ) : null}
                  {description ? (
                    <p
                      id="modal-desc"
                      className="mt-1 text-sm text-text-secondary"
                    >
                      {description}
                    </p>
                  ) : null}
                </div>
                {!hideCloseButton ? (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Schließen"
                    onClick={onClose}
                  >
                    <X className="size-5" aria-hidden="true" />
                  </IconButton>
                ) : null}
              </div>
            )}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
