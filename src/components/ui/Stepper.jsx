import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Numeric Stepper — dient u. a. als Portionsrechner.
 */
export default function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  label,
  suffix,
  ariaLabel = "Menge",
  size = "md",
  className,
}) {
  const clamp = useCallback(
    (n) => Math.min(max, Math.max(min, n)),
    [min, max],
  );
  const dec = () => onChange(clamp(value - step));
  const inc = () => onChange(clamp(value + step));

  const sizes = {
    sm: { button: "size-8", value: "min-w-10 text-sm", wrap: "h-9" },
    md: { button: "size-10", value: "min-w-12 text-base", wrap: "h-11" },
    lg: { button: "size-12", value: "min-w-14 text-lg", wrap: "h-13" },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      {label ? (
        <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-border-strong bg-surface-elevated p-1",
          s.wrap,
        )}
        role="group"
        aria-label={ariaLabel}
      >
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label="Weniger"
          className={cn(
            "inline-flex items-center justify-center rounded-full text-text transition hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40",
            s.button,
          )}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <span
          aria-live="polite"
          className={cn(
            "text-center font-medium tabular-nums text-text",
            s.value,
          )}
        >
          {value}
          {suffix ? (
            <span className="ml-1 text-xs text-text-muted">{suffix}</span>
          ) : null}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label="Mehr"
          className={cn(
            "inline-flex items-center justify-center rounded-full text-text transition hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40",
            s.button,
          )}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
