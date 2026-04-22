import { cn } from "../../utils/cn";
import Button from "./Button";

/**
 * Leerer Zustand mit Icon, Titel, Text und optionalem CTA.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-border-strong bg-surface/30 px-6 py-10 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      ) : null}
      {title ? (
        <h3 className="font-serif text-2xl text-text">{title}</h3>
      ) : null}
      {description ? (
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      ) : null}
      {action ? (
        <Button
          variant={action.variant ?? "primary"}
          onClick={action.onClick}
          leftIcon={action.icon}
        >
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
