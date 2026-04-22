import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from "lucide-react";
import { ToastContext } from "./toast-context";
import { cn } from "../utils/cn";

const iconFor = {
  success: CheckCircle2,
  danger: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const toneFor = {
  success: "border-success/50 text-success",
  danger: "border-danger/50 text-danger",
  warning: "border-warning/50 text-warning",
  info: "border-accent/50 text-accent",
};

export function ToastProvider({ children, duration = 4000 }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const handle = timers.current.get(id);
    if (handle) {
      clearTimeout(handle);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration: d = duration }) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((list) => [...list, { id, title, description, variant }]);
      if (d > 0) {
        const handle = setTimeout(() => dismiss(id), d);
        timers.current.set(id, handle);
      }
      return id;
    },
    [dismiss, duration],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = iconFor[t.variant] ?? Info;
            return (
              <motion.div
                key={t.id}
                role={t.variant === "danger" ? "alert" : "status"}
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border bg-surface-elevated/95 p-4 shadow-soft backdrop-blur",
                  toneFor[t.variant] ?? toneFor.info,
                )}
              >
                <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div className="flex-1 text-sm">
                  {t.title ? (
                    <p className="font-medium text-text">{t.title}</p>
                  ) : null}
                  {t.description ? (
                    <p className="mt-0.5 text-text-secondary">
                      {t.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Toast schließen"
                  className="-m-1 rounded-full p-1 text-text-muted transition hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
