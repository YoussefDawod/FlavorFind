import { useId } from "react";
import { cn } from "../../utils/cn";

/**
 * Barrierefreier Switch (role=switch).
 */
export default function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
  className,
}) {
  const autoId = useId();
  const toggleId = id ?? autoId;

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        "flex cursor-pointer items-center gap-3",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-accent",
          checked
            ? "border-accent bg-accent"
            : "border-border-strong bg-surface-elevated",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block size-4 translate-x-0.5 rounded-full bg-[#F5EFE6] shadow transition duration-200 ease-out",
            checked && "translate-x-[1.375rem]",
          )}
        />
      </button>
      {label ? (
        <span className="flex flex-col">
          <span className="text-sm font-medium text-text">{label}</span>
          {description ? (
            <span className="text-xs text-text-muted">{description}</span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
