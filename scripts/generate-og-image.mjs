import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public", { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="30%" cy="40%" r="90%">
      <stop offset="0%" stop-color="#1F1410"/>
      <stop offset="60%" stop-color="#0A0606"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="mono" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9B887"/>
      <stop offset="100%" stop-color="#D4A574"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- subtle grain overlay via repeated dots -->
  <g opacity="0.04" fill="#F5EFE6">
    <circle cx="120" cy="80" r="1.5"/>
    <circle cx="340" cy="220" r="1"/>
    <circle cx="900" cy="140" r="1.2"/>
    <circle cx="1080" cy="420" r="1"/>
    <circle cx="220" cy="520" r="1.5"/>
    <circle cx="620" cy="560" r="1"/>
  </g>

  <!-- Brandmark -->
  <g filter="url(#glow)">
    <text x="100" y="340"
          font-family="Georgia, 'Playfair Display', serif"
          font-size="180"
          font-style="italic"
          font-weight="600"
          fill="url(#mono)">ff</text>
  </g>

  <!-- Divider -->
  <rect x="100" y="390" width="80" height="2" fill="#D4A574" opacity="0.7"/>

  <!-- Product name -->
  <text x="100" y="460"
        font-family="Georgia, 'Playfair Display', serif"
        font-size="72"
        font-weight="600"
        fill="#F5EFE6">FlavorFind</text>

  <!-- Tagline -->
  <text x="100" y="520"
        font-family="'Inter', system-ui, sans-serif"
        font-size="30"
        font-weight="400"
        fill="#C7B8A8"
        letter-spacing="1">Cook like it matters.</text>

  <!-- Bottom meta -->
  <text x="100" y="580"
        font-family="'Inter', system-ui, sans-serif"
        font-size="18"
        font-weight="500"
        fill="#8A7C6F"
        letter-spacing="4">CINEMATIC RECIPE PWA</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("public/og-image.jpg 1200x630 ✓");
