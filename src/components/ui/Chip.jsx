import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border whitespace-nowrap transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
  {
    variants: {
      variant: {
        default:
          "border-border-strong bg-surface-elevated text-text hover:border-accent hover:text-accent",
        active: "border-accent bg-accent text-[#1F1410]",
        muted: "border-border bg-transparent text-text-muted",
        removable:
          "border-border-strong bg-surface-elevated text-text pl-3 pr-1",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-8 px-4 text-sm",
        lg: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

/**
 * Vielseitiges Chip/Tag-Element.
 * - `onClick` → Filter-Toggle-Button
 * - `onRemove` → rendert Entfernen-Kreuz (z. B. Zutaten-Chip)
 */
export default function Chip({
  className,
  variant,
  size,
  children,
  onClick,
  onRemove,
  active = false,
  disabled = false,
  type,
  ...props
}) {
  const resolvedVariant = active ? "active" : onRemove ? "removable" : variant;
  const isButton = Boolean(onClick);

  const content = (
    <>
      <span className="truncate">{children}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          aria-label="Entfernen"
          className="ml-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-text-muted transition hover:bg-secondary-soft hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      ) : null}
    </>
  );

  if (isButton) {
    return (
      <button
        type={type ?? "button"}
        onClick={onClick}
        disabled={disabled}
        aria-pressed={active}
        className={cn(
          chipVariants({ variant: resolvedVariant, size }),
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      className={cn(chipVariants({ variant: resolvedVariant, size }), className)}
      {...props}
    >
      {content}
    </span>
  );
}
