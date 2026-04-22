import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Timer as TimerIcon,
  X,
} from "lucide-react";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { Skeleton } from "../components/feedback/Skeleton";
import { ErrorState } from "../components/feedback/ErrorState";
import { useRecipeDetail } from "../hooks/useRecipes";
import { useCountdown } from "../hooks/useCountdown";
import { useWakeLock } from "../hooks/useWakeLock";
import { useToast } from "../hooks/useToast";
import { parseIdFromSlug } from "../utils/slug";
import { ROUTES } from "../utils/routes";
import { cn } from "../utils/cn";

const TIMER_PRESETS = [60, 180, 300, 600, 900];

function formatClock(s) {
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * Extrahiert eine Minuten-Angabe aus einem Anleitungs-Schritt (z. B.
 * "5 Minuten", "10 min", "1 Stunde"). Gibt Sekunden zurück oder null.
 */
function inferStepSeconds(text = "") {
  const lower = text.toLowerCase();
  const min = lower.match(/(\d+)\s*(?:minute|minuten|min\.?|mins?)/);
  if (min) return Number(min[1]) * 60;
  const hr = lower.match(/(\d+)\s*(?:stunde|stunden|h\b)/);
  if (hr) return Number(hr[1]) * 3600;
  const sec = lower.match(/(\d+)\s*(?:sekunde|sekunden|sec|s\b)/);
  if (sec) return Number(sec[1]);
  return null;
}

/** Ein kurzes Beep via WebAudio (kein externes Asset). */
function playBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    o.start();
    o.stop(ctx.currentTime + 1);
    // Doppel-Pling
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "sine";
    o2.frequency.value = 1320;
    o2.connect(g2);
    g2.connect(ctx.destination);
    g2.gain.setValueAtTime(0.001, ctx.currentTime + 0.3);
    g2.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.32);
    g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
    o2.start(ctx.currentTime + 0.3);
    o2.stop(ctx.currentTime + 1.2);
    setTimeout(() => ctx.close().catch(() => {}), 1500);
  } catch {
    /* ignore */
  }
}

export default function CookModePage() {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const id = useMemo(() => parseIdFromSlug(slugId), [slugId]);

  const { data: recipe, isLoading, isError, error, refetch } =
    useRecipeDetail(id);

  const steps = recipe?.analyzedInstructions?.[0]?.steps ?? [];
  const totalSteps = steps.length;

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const wakeLock = useWakeLock();

  const timer = useCountdown({
    onFinish: () => {
      playBeep();
      toast({
        variant: "success",
        title: "Timer fertig!",
        description: "Weiter zum nächsten Schritt.",
      });
    },
  });

  useEffect(() => {
    if (recipe?.title) {
      document.title = `Kochen: ${recipe.title} – FlavorFind`;
    }
  }, [recipe?.title]);

  // Wake-Lock beim Betreten versuchen, beim Verlassen wieder freigeben.
  useEffect(() => {
    wakeLock.request();
    return () => {
      wakeLock.release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStep = steps[index];
  const suggestedSeconds = currentStep
    ? inferStepSeconds(currentStep.step)
    : null;
  const progress = totalSteps > 0 ? ((index + 1) / totalSteps) * 100 : 0;

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
  }
  function goNext() {
    if (index < totalSteps - 1) {
      setIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  }

  if (isLoading) return <CookModeSkeleton />;
  if (isError || !recipe) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bg px-6">
        <ErrorState
          error={error ?? new Error("Rezept nicht gefunden.")}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg text-text">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
        <Link
          to={ROUTES.recipe(slugId)}
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Rezept verlassen</span>
        </Link>
        <div className="flex flex-1 items-center justify-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Koch-Modus
          </span>
          <span className="hidden max-w-xs truncate font-serif text-sm text-text sm:inline">
            {recipe.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {wakeLock.isSupported ? (
            <IconButton
              variant={wakeLock.isActive ? "solid" : "ghost"}
              size="sm"
              aria-label={
                wakeLock.isActive
                  ? "Wake-Lock aktiv — deaktivieren"
                  : "Bildschirm wachhalten"
              }
              onClick={() =>
                wakeLock.isActive ? wakeLock.release() : wakeLock.request()
              }
            >
              <Eye className="size-4" aria-hidden="true" />
            </IconButton>
          ) : null}
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Koch-Modus schließen"
            onClick={() => navigate(ROUTES.recipe(slugId))}
          >
            <X className="size-4" aria-hidden="true" />
          </IconButton>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 w-full bg-surface-elevated">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8 sm:px-10">
        {totalSteps === 0 ? (
          <div className="max-w-xl text-center">
            <h1 className="font-serif text-3xl text-text sm:text-4xl">
              Keine strukturierte Anleitung
            </h1>
            <p className="mt-4 text-text-secondary">
              Für dieses Rezept liegt keine schrittweise Anleitung vor.
            </p>
            {recipe.sourceUrl ? (
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-accent hover:underline"
              >
                Originalquelle öffnen
              </a>
            ) : null}
          </div>
        ) : (
          <div className="flex w-full max-w-3xl flex-col items-center gap-10">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Schritt {index + 1} / {totalSteps}
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-serif text-2xl leading-relaxed text-text sm:text-3xl lg:text-4xl"
              >
                {currentStep?.step}
              </motion.p>
            </AnimatePresence>

            <TimerPanel timer={timer} suggested={suggestedSeconds} />
          </div>
        )}
      </main>

      {/* Footer controls */}
      <footer className="flex items-center justify-between gap-3 border-t border-border px-4 py-4 sm:px-8">
        <Button
          variant="ghost"
          size="lg"
          leftIcon={<ChevronLeft className="size-4" aria-hidden="true" />}
          onClick={goPrev}
          disabled={index === 0}
        >
          Zurück
        </Button>
        <div className="hidden items-center gap-1.5 sm:flex">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-8 bg-accent"
                  : i < index
                    ? "w-3 bg-accent/50"
                    : "w-3 bg-border",
              )}
            />
          ))}
        </div>
        <Button
          variant="primary"
          size="lg"
          rightIcon={
            index === totalSteps - 1 ? (
              <Sparkles className="size-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="size-4" aria-hidden="true" />
            )
          }
          onClick={goNext}
          disabled={totalSteps === 0}
        >
          {index === totalSteps - 1 ? "Fertig" : "Weiter"}
        </Button>
      </footer>

      <AnimatePresence>
        {finished ? (
          <FinishOverlay
            onClose={() => setFinished(false)}
            onExit={() => navigate(ROUTES.recipe(slugId))}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TimerPanel({ timer, suggested }) {
  const [custom, setCustom] = useState("");
  const presets = useMemo(() => {
    const set = new Set(TIMER_PRESETS);
    if (Number.isFinite(suggested) && suggested > 0) set.add(suggested);
    return Array.from(set).sort((a, b) => a - b);
  }, [suggested]);

  const progress =
    timer.duration > 0
      ? ((timer.duration - timer.remaining) / timer.duration) * 100
      : 0;

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border border-border bg-surface/50 p-5 shadow-soft">
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
        <TimerIcon className="size-4 text-accent" aria-hidden="true" />
        Timer
      </div>

      <div className="font-mono text-5xl tabular-nums text-text sm:text-6xl">
        {formatClock(timer.remaining || timer.duration || 0)}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {presets.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => timer.start(s)}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs transition",
              suggested === s
                ? "border-accent bg-accent-soft text-accent"
                : "border-border-strong bg-surface-elevated text-text hover:border-accent hover:text-accent",
            )}
          >
            {s >= 60 ? `${Math.round(s / 60)} min` : `${s} s`}
            {suggested === s ? " ★" : ""}
          </button>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const n = Number(custom);
            if (Number.isFinite(n) && n > 0) {
              timer.start(n * 60);
              setCustom("");
            }
          }}
          className="inline-flex h-8 items-center gap-1 rounded-full border border-border-strong bg-surface-elevated pl-3 pr-1 text-xs"
        >
          <input
            type="number"
            min="1"
            max="240"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="min"
            className="w-14 bg-transparent text-xs outline-none placeholder:text-text-muted"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1F1410] hover:bg-accent/90"
          >
            Start
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2">
        {timer.isRunning ? (
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Pause className="size-4" aria-hidden="true" />}
            onClick={timer.pause}
          >
            Pause
          </Button>
        ) : timer.duration > 0 && timer.remaining > 0 ? (
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Play className="size-4" aria-hidden="true" />}
            onClick={() => timer.start()}
          >
            Fortsetzen
          </Button>
        ) : null}
        {timer.duration > 0 ? (
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<RotateCcw className="size-4" aria-hidden="true" />}
            onClick={timer.reset}
          >
            Zurücksetzen
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function FinishOverlay({ onClose, onExit }) {
  const pieces = useRef(
    Array.from({ length: 48 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      rot: Math.random() * 360,
      hue: Math.floor(Math.random() * 60) + 20,
    })),
  ).current;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/85 backdrop-blur"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((p, i) => (
          <motion.span
            key={i}
            initial={{ y: -40, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ y: "110vh", rotate: p.rot + 720, opacity: 0 }}
            transition={{ duration: 3, delay: p.delay, ease: "easeIn" }}
            className="absolute top-0 block size-2 rounded-[2px]"
            style={{ background: `hsl(${p.hue}, 80%, 60%)` }}
          />
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.9, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 16 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative mx-6 flex max-w-md flex-col items-center gap-5 rounded-3xl border border-border bg-surface p-8 text-center shadow-glow"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-[#1F1410]">
          <Sparkles className="size-7" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-3xl text-text">Bon appétit!</h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          Du hast alle Schritte geschafft. Genieße dein Gericht — und vergiss
          nicht, es als Favorit zu speichern.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Nochmal anschauen
          </Button>
          <Button variant="primary" onClick={onExit}>
            Zum Rezept
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CookModeSkeleton() {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg">
      <div className="border-b border-border px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-24 w-full max-w-2xl" />
        <Skeleton className="h-40 w-full max-w-lg rounded-3xl" />
      </div>
      <div className="border-t border-border px-6 py-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

