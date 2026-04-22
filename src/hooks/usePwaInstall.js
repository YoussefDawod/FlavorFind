import { useEffect, useState } from "react";

/**
 * Lauscht auf `beforeinstallprompt` (Chrome/Edge/Android) und erlaubt eine
 * explizite Install-Aufforderung. Auf iOS/Safari ist das Event nicht verfügbar,
 * dort liefert der Hook `isIosStandaloneCapable`, damit ein manueller
 * Hinweis („Zum Home-Bildschirm hinzufügen") gezeigt werden kann.
 */
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  });
  const [isIos] = useState(() => {
    if (typeof window === "undefined") return false;
    const ua = window.navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    const onInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return "unavailable";
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return outcome; // "accepted" | "dismissed"
    } catch {
      return "error";
    }
  };

  return {
    canInstall: Boolean(deferredPrompt),
    isStandalone,
    isIosStandaloneCapable: isIos && !isStandalone,
    promptInstall,
  };
}
