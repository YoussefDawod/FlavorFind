/**
 * GrainOverlay — feine SVG-Noise-Textur, fixed über dem Hintergrund.
 * Bricht die digitale Flächigkeit und gibt dem Dark-Luxury-Look Tiefe.
 *
 * Verwendet eine inline SVG-Filter (feTurbulence) → keine externe Datei.
 * Respektiert prefers-reduced-motion über CSS im tailwind.css Layer.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
      style={{ opacity: 0.035 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
