import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Konfliktfreie Kombination von Tailwind-Klassen.
 * @example cn("p-2", condition && "p-4") → "p-4"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
