/**
 * One-off Script zum Erzeugen der PWA-Icons aus einem großformatigen SVG.
 * Aufruf: `node scripts/generate-pwa-icons.mjs`
 *
 * Erzeugt in /public/icons:
 *  - icon-192.png            (PWA standard)
 *  - icon-512.png            (PWA standard)
 *  - icon-maskable-512.png   (PWA maskable, safe zone 80 %)
 *  - apple-touch-icon.png    (180 × 180, iOS)
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const OUT_DIR = resolve(process.cwd(), "public/icons");

/**
 * Produkt-Icon: warmes „ff"-Monogramm auf Brand-Dark, mit Kupfer-Glow-Ring.
 */
function iconSvg({ size, safeZonePercent = 100 }) {
  const padding = ((100 - safeZonePercent) / 2) * (size / 100);
  const inner = size - padding * 2;
  const radius = inner * 0.18;
  const fontSize = inner * 0.56;
  const textY = padding + inner * 0.68;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1F1410"/>
      <stop offset="100%" stop-color="#0F0A08"/>
    </radialGradient>
    <linearGradient id="mono" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9B887"/>
      <stop offset="100%" stop-color="#D4A574"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="#0F0A08"/>
  <rect x="${padding}" y="${padding}" width="${inner}" height="${inner}" rx="${radius}" fill="url(#bg)"/>
  <text
    x="${size / 2}" y="${textY}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="${fontSize}" font-weight="700" font-style="italic"
    text-anchor="middle" fill="url(#mono)"
  >ff</text>
</svg>`;
}

async function renderPng(size, filename, { safeZonePercent = 100 } = {}) {
  const svg = iconSvg({ size, safeZonePercent });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(resolve(OUT_DIR, filename), png);
  console.log(`  ${filename.padEnd(28)} ${size}×${size} ✓`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("Generating PWA icons:");
  await renderPng(192, "icon-192.png");
  await renderPng(512, "icon-512.png");
  // Maskable: Sicherheitszone 80 % (Safe-Area für adaptive Icons)
  await renderPng(512, "icon-maskable-512.png", { safeZonePercent: 80 });
  await renderPng(180, "apple-touch-icon.png");
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
