import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Dices, Sparkles, Users } from "lucide-react";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Skeleton } from "../components/feedback/Skeleton";
import { ErrorState } from "../components/feedback/ErrorState";
import FavoriteButton from "../components/recipe/FavoriteButton";
import { useRandomRecipes } from "../hooks/useRecipes";
import { ROUTES } from "../utils/routes";
import { toSlugId } from "../utils/slug";
import { formatMinutes } from "../utils/formatters";

const SPIN_MS = 1600;
const REEL_STEPS = 14;

export default function SurprisePage() {
  const navigate = useNavigate();
  const {
    data: pool = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useRandomRecipes({ number: 12 });

  const [picked, setPicked] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);

  const candidates = useMemo(
    () => pool.filter((r) => Boolean(r?.title)),
    [pool],
  );

  useEffect(() => {
    if (!isSpinning) return undefined;
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setReelIndex((i) => (i + 1) % Math.max(candidates.length, 1));
      if (step >= REEL_STEPS) clearInterval(interval);
    }, SPIN_MS / REEL_STEPS);
    return () => clearInterval(interval);
  }, [isSpinning, candidates.length]);

  function spin() {
    if (candidates.length === 0 || isSpinning) return;
    setPicked(null);
    setIsSpinning(true);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    window.setTimeout(() => {
      setPicked(next);
      setIsSpinning(false);
    }, SPIN_MS);
  }

  const reelRecipe = isSpinning
    ? (candidates[reelIndex] ?? null)
    : (picked ?? candidates[0] ?? null);

  return (
    <PageShell
      eyebrow="Überraschung"
      title="Lass dich inspirieren."
      intro="Dreh am Rad — wir wählen ein Rezept für dich aus. Perfekt, wenn dir gerade nichts einfällt."
      actions={
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Dices className="size-4" aria-hidden="true" />}
          onClick={spin}
          disabled={isSpinning || candidates.length === 0}
        >
          {isSpinning ? "Dreht …" : picked ? "Nochmal drehen" : "Glücksrad drehen"}
        </Button>
      }
    >
      {isError ? (
        <ErrorState error={error} onRetry={() => refetch()} />
      ) : isLoading ? (
        <Skeleton className="h-96 w-full rounded-3xl" />
      ) : (
        <div className="relative mx-auto max-w-2xl">
          <div className="pointer-events-none absolute -inset-8 rounded-[32px] bg-accent/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
            <AnimatePresence mode="popLayout">
              {reelRecipe ? (
                <motion.div
                  key={`${isSpinning ? "spin" : "pick"}-${reelRecipe.id}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{
                    duration: isSpinning ? SPIN_MS / REEL_STEPS / 1000 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col gap-0"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-elevated">
                    {reelRecipe.image ? (
                      <img
                        src={reelRecipe.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg/80 to-transparent" />
                    {!isSpinning && picked ? (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#1F1410]">
                        <Sparkles className="size-3" aria-hidden="true" />
                        Für dich gezogen
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-4 p-6 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      {(reelRecipe.cuisines ?? []).slice(0, 2).map((c) => (
                        <Badge key={c} variant="outline" size="sm">
                          {c}
                        </Badge>
                      ))}
                      {reelRecipe.vegetarian ? (
                        <Badge variant="accent" size="sm">
                          Vegetarisch
                        </Badge>
                      ) : null}
                    </div>
                    <h2 className="font-serif text-3xl leading-tight text-text sm:text-4xl">
                      {reelRecipe.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                      {Number.isFinite(reelRecipe.readyInMinutes) ? (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-4" aria-hidden="true" />
                          {formatMinutes(reelRecipe.readyInMinutes)}
                        </span>
                      ) : null}
                      {Number.isFinite(reelRecipe.servings) ? (
                        <span className="inline-flex items-center gap-1">
                          <Users className="size-4" aria-hidden="true" />
                          {reelRecipe.servings} Port.
                        </span>
                      ) : null}
                    </div>
                    {!isSpinning && picked ? (
                      <div className="mt-2 flex flex-wrap gap-3">
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(
                              ROUTES.recipe(
                                toSlugId(reelRecipe.title, reelRecipe.id),
                              ),
                            )
                          }
                        >
                          Rezept öffnen
                        </Button>
                        <FavoriteButton recipe={reelRecipe} size="md" />
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center text-text-muted">
                  Keine Rezepte verfügbar.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </PageShell>
  );
}
