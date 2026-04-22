import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wake-Lock-Hook (Screen Wake Lock API).
 * Hält das Display wach, solange aktiv; gibt automatisch wieder frei, wenn der
 * Tab in den Hintergrund geht, und fordert es bei Rückkehr neu an.
 */
export function useWakeLock() {
  const [isActive, setIsActive] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setIsSupported(
      typeof navigator !== "undefined" && "wakeLock" in navigator,
    );
  }, []);

  const release = useCallback(async () => {
    try {
      await sentinelRef.current?.release?.();
    } catch {
      /* ignore */
    }
    sentinelRef.current = null;
    setIsActive(false);
  }, []);

  const request = useCallback(async () => {
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) {
      return false;
    }
    try {
      const sentinel = await navigator.wakeLock.request("screen");
      sentinelRef.current = sentinel;
      setIsActive(true);
      sentinel.addEventListener?.("release", () => {
        setIsActive(false);
      });
      return true;
    } catch {
      sentinelRef.current = null;
      setIsActive(false);
      return false;
    }
  }, []);

  useEffect(() => {
    function handleVisibility() {
      if (document.visibilityState === "visible" && sentinelRef.current === null && isActive) {
        // Re-request, wenn es im Hintergrund automatisch released wurde.
        request();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isActive, request]);

  useEffect(() => {
    return () => {
      sentinelRef.current?.release?.().catch(() => {});
      sentinelRef.current = null;
    };
  }, []);

  return { request, release, isActive, isSupported };
}
