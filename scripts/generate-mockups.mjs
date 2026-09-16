/**
 * Gera mockups de embalagem "SUA MARCA AQUI" (pote de pó, frasco de
 * cápsulas e sachê) como WebP com fundo transparente.
 * Uso: node scripts/generate-mockups.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');

const BRAND = '#1d4ed8';
const BRAND_DARK = '#1e3fb0';
const ACCENT = '#0d9488';
const INK = '#0f172a';

const font = (size, weight = 700) =>
  `font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}"`;

/** Pote de pó (ex.: creatina/whey) — 800x1000 */
function poteSvg({ titulo, subtitulo, medida, doses }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="corpo" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="18%" stop-color="#1e293b"/>
      <stop offset="80%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="tampa" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="brilho" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- sombra -->
  <ellipse cx="400" cy="952" rx="250" ry="34" fill="${INK}" opacity="0.10"/>

  <!-- tampa -->
  <rect x="150" y="158" width="500" height="118" rx="34" fill="url(#tampa)"/>
  ${Array.from({ length: 16 }, (_, i) => 178 + i * 29)
    .map((x) => `<rect x="${x}" y="176" width="7" height="82" rx="3.5" fill="#ffffff" opacity="0.06"/>`)
    .join('')}

  <!-- ombro -->
  <path d="M195 276 h410 q10 0 12 14 l10 62 h-454 l10 -62 q2 -14 12 -14 z" fill="#0b1220"/>

  <!-- corpo -->
  <rect x="170" y="344" width="460" height="590" rx="52" fill="url(#corpo)"/>
  <rect x="170" y="344" width="460" height="590" rx="52" fill="url(#brilho)"/>

  <!-- rótulo -->
  <rect x="216" y="420" width="368" height="452" rx="18" fill="#ffffff"/>
  <rect x="216" y="420" width="368" height="10" rx="5" fill="${BRAND}"/>

  <!-- conteúdo do rótulo -->
  <text x="400" y="498" ${font(30, 600)} letter-spacing="10" fill="#64748b" text-anchor="middle">SUPLEMENTO</text>
  <text x="400" y="580" ${font(56)} fill="${INK}" text-anchor="middle" letter-spacing="2">SUA MARCA</text>
  <text x="400" y="650" ${font(64)} fill="${BRAND}" text-anchor="middle" letter-spacing="6">AQUI</text>

  <line x1="270" y1="692" x2="530" y2="692" stroke="#e2e8f0" stroke-width="3"/>

  <text x="400" y="748" ${font(34, 800)} fill="${INK}" text-anchor="middle" letter-spacing="1">${titulo}</text>
  ${subtitulo ? `<text x="400" y="788" ${font(24, 500)} fill="#64748b" text-anchor="middle" letter-spacing="2">${subtitulo}</text>` : ''}

  <rect x="268" y="812" width="264" height="44" rx="22" fill="#eff6ff"/>
  <text x="400" y="841" ${font(22, 700)} fill="${BRAND_DARK}" text-anchor="middle" letter-spacing="2">${medida}</text>

  <!-- faixa de doses -->
  <path d="M216 828 v26 q0 18 -18 18 h386 q-18 0 -18 -18 v-26 z" fill="${ACCENT}" opacity="0"/>
  <rect x="216" y="800" width="368" height="72" rx="0" fill="none"/>
  <rect x="216" y="796" width="368" height="0" fill="none"/>
  <path d="M216 836 h368 v18 q0 18 -18 18 h-332 q-18 0 -18 -18 z" fill="${ACCENT}"/>
  <text x="400" y="866" ${font(22, 700)} fill="#ffffff" text-anchor="middle" letter-spacing="3">${doses}</text>
</svg>`;
}

/** Frasco de cápsulas — 700x900 */
function frascoSvg({ titulo, subtitulo, medida, doses }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 900">
  <defs>
    <linearGradient id="corpoF" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="22%" stop-color="#f1f5f9"/>
      <stop offset="82%" stop-color="#dbe3ee"/>
      <stop offset="100%" stop-color="#c3cedd"/>
    </linearGradient>
    <linearGradient id="brilhoF" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="tampaF" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>

  <ellipse cx="350" cy="856" rx="210" ry="30" fill="${INK}" opacity="0.10"/>

  <!-- tampa -->
  <rect x="238" y="128" width="224" height="96" rx="26" fill="url(#tampaF)"/>
  ${Array.from({ length: 8 }, (_, i) => 258 + i * 24)
    .map((x) => `<rect x="${x}" y="142" width="6" height="68" rx="3" fill="#ffffff" opacity="0.07"/>`)
    .join('')}
  <!-- pescoço -->
  <rect x="262" y="216" width="176" height="52" fill="#0b1220" rx="8"/>

  <!-- corpo -->
  <rect x="182" y="262" width="336" height="560" rx="40" fill="url(#corpoF)"/>
  <rect x="182" y="262" width="336" height="560" rx="40" fill="url(#brilhoF)"/>
  <rect x="182" y="262" width="336" height="560" rx="40" fill="none" stroke="#94a3b8" stroke-opacity="0.5" stroke-width="2"/>

  <!-- rótulo -->
  <rect x="216" y="326" width="268" height="424" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <rect x="216" y="326" width="268" height="9" rx="4.5" fill="${BRAND}"/>

  <text x="350" y="392" ${font(24, 600)} letter-spacing="8" fill="#64748b" text-anchor="middle">SUPLEMENTO</text>
  <text x="350" y="458" ${font(42)} fill="${INK}" text-anchor="middle" letter-spacing="1">SUA MARCA</text>
  <text x="350" y="512" ${font(48)} fill="${BRAND}" text-anchor="middle" letter-spacing="5">AQUI</text>

  <line x1="258" y1="544" x2="442" y2="544" stroke="#e2e8f0" stroke-width="3"/>

  <text x="350" y="594" ${font(30, 800)} fill="${INK}" text-anchor="middle">${titulo}</text>
  ${subtitulo ? `<text x="350" y="628" ${font(20, 500)} fill="#64748b" text-anchor="middle" letter-spacing="1">${subtitulo}</text>` : ''}

  <rect x="252" y="650" width="196" height="40" rx="20" fill="#eff6ff"/>
  <text x="350" y="676" ${font(20, 700)} fill="${BRAND_DARK}" text-anchor="middle" letter-spacing="1">${medida}</text>

  <path d="M216 736 h268 v-4 q0 18 -18 18 h-232 q-18 0 -18 -18 z" fill="${ACCENT}"/>
  <text x="350" y="752" ${font(19, 700)} fill="#ffffff" text-anchor="middle" letter-spacing="2">${doses}</text>
</svg>`;
}

/** Sachê stick — 560x940 */
function sacheSvg({ titulo, medida, doses }) {
  const serras = Array.from({ length: 14 }, (_, i) => {
    const x = 70 + i * 30;
    return `<path d="M${x} 96 l15 -34 l15 34 z" fill="#e2e8f0"/>`;
  }).join('');
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 940">
  <defs>
    <linearGradient id="sachec" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#f8fafc"/>
      <stop offset="85%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="brilhoS" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <ellipse cx="280" cy="902" rx="150" ry="24" fill="${INK}" opacity="0.10"/>

  <!-- corpo -->
  <rect x="70" y="96" width="420" height="780" rx="18" fill="url(#sachec)" stroke="#94a3b8" stroke-opacity="0.45" stroke-width="2"/>
  ${serras}
  <rect x="70" y="856" width="420" height="20" rx="8" fill="#e2e8f0"/>

  <rect x="70" y="96" width="420" height="780" rx="18" fill="url(#brilhoS)"/>

  <!-- vinco lateral -->
  <line x1="112" y1="130" x2="112" y2="842" stroke="#94a3b8" stroke-opacity="0.35" stroke-width="2"/>
  <line x1="448" y1="130" x2="448" y2="842" stroke="#94a3b8" stroke-opacity="0.35" stroke-width="2"/>

  <text x="280" y="230" ${font(24, 600)} letter-spacing="8" fill="#64748b" text-anchor="middle">SUPLEMENTO</text>
  <text x="280" y="312" ${font(46)} fill="${INK}" text-anchor="middle" letter-spacing="1">SUA MARCA</text>
  <text x="280" y="376" ${font(52)} fill="${BRAND}" text-anchor="middle" letter-spacing="5">AQUI</text>

  <line x1="150" y1="420" x2="410" y2="420" stroke="#e2e8f0" stroke-width="3"/>

  <text x="280" y="486" ${font(36, 800)} fill="${INK}" text-anchor="middle">${titulo}</text>

  <rect x="150" y="520" width="260" height="44" rx="22" fill="#eff6ff"/>
  <text x="280" y="549" ${font(21, 700)} fill="${BRAND_DARK}" text-anchor="middle" letter-spacing="1">${medida}</text>

  <path d="M150 660 h260 v-2 q0 16 -16 16 h-228 q-16 0 -16 -16 z" fill="${ACCENT}"/>
  <text x="280" y="674" ${font(19, 700)} fill="#ffffff" text-anchor="middle" letter-spacing="2">${doses}</text>
</svg>`;
}

const mockups = [
  ['mockup-pote.webp', poteSvg({ titulo: 'CREATINA', subtitulo: 'MONOHIDRATADA', medida: '300 g · 60 DOSES', doses: 'PÓ · ALTO RENDIMENTO' })],
  ['mockup-frasco.webp', frascoSvg({ titulo: 'ÔMEGA 3', subtitulo: 'EPA + DHA', medida: '90 CÁPSULAS', doses: 'CÁPSULAS · SAÚDE' })],
  ['mockup-sache.webp', sacheSvg({ titulo: 'COLÁGENO', medida: '10 g · VITAMINA C', doses: 'SACHÊ · BEM-ESTAR' })],
];

for (const [name, svg] of mockups) {
  const out = join(outDir, name);
  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(out);
  console.log(name, 'gerado');
}
