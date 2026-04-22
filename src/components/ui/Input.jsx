import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const inputVariants = cva(
  "w-full rounded-xl border bg-surface/60 text-text placeholder:text-text-muted transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-13 px-5 text-base",
      },
      state: {
        default: "border-border-strong hover:border-accent/60",
        error: "border-danger focus-visible:ring-danger",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  },
);

const Input = forwardRef(function Input(
  {
    className,
    size,
    state,
    type = "text",
    label,
    helperText,
    errorText,
    leftIcon,
    rightSlot,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = helperText ? `${inputId}-help` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;
  const resolvedState = errorText ? "error" : state;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="text-xs font-medium uppercase tracking-widest text-text-secondary"
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center">
        {leftIcon ? (
          <span
            className="pointer-events-none absolute left-3 flex items-center text-text-muted"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={errorText ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            inputVariants({ size, state: resolvedState }),
            leftIcon ? "pl-10" : null,
            rightSlot ? "pr-12" : null,
            className,
          )}
          {...props}
        />
        {rightSlot ? (
          <span className="absolute right-2 flex items-center">{rightSlot}</span>
        ) : null}
      </div>
      {errorText ? (
        <p id={errorId} className="text-xs text-danger">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={helpId} className="text-xs text-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
