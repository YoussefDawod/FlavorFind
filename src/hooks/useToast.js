import { useContext } from "react";
import { ToastContext } from "../context/toast-context";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast muss innerhalb von <ToastProvider> genutzt werden.");
  }
  return ctx;
}
