import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const cardVariants = cva(
  "rounded-2xl border transition backdrop-blur",
  {
    variants: {
      variant: {
        default: "border-border bg-surface/60 shadow-soft",
        elevated:
          "border-border bg-surface-elevated shadow-lg",
        outline: "border-border-strong bg-transparent",
        ghost: "border-transparent bg-surface/30",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:border-accent hover:shadow-glow",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

const Card = forwardRef(function Card(
  { className, variant, interactive, padding, as: Component = "div", ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, interactive, padding }), className)}
      {...props}
    />
  );
});

export default Card;
