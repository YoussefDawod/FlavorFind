/**
 * AmbientGlow — warmer Radial-Gradient hinter dem Hero.
 * Terracotta → transparent. Fixed, zwischen Grain und Content.
 */
export default function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(194, 65, 12, 0.18) 0%, transparent 60%)",
      }}
    />
  );
}
