import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Countdown-Hook mit Sekunden-Auflösung.
 * - `start(seconds?)`: Startet (oder resumed, wenn keine Dauer übergeben wird).
 * - `pause()`, `reset()`: Steuerung.
 * - `isRunning`, `isFinished`, `remaining`: aktueller Zustand.
 * - `onFinish`: wird einmal bei Erreichen von 0 aufgerufen.
 */
export function useCountdown({ onFinish } = {}) {
  const [duration, setDuration] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const finishedRef = useRef(false);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (!finishedRef.current) {
            finishedRef.current = true;
            try {
              onFinishRef.current?.();
            } catch {
              /* ignore */
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback((seconds) => {
    if (Number.isFinite(seconds) && seconds > 0) {
      finishedRef.current = false;
      setDuration(seconds);
      setRemaining(seconds);
      setIsRunning(true);
    } else {
      setIsRunning(true);
    }
  }, []);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemaining(0);
    setDuration(0);
    finishedRef.current = false;
  }, []);

  return {
    duration,
    remaining,
    isRunning,
    isFinished: duration > 0 && remaining === 0,
    start,
    pause,
    reset,
  };
}
