/**
 * Gera public/og-image.png (1200x630) sem dependências externas.
 * Uso: node scripts/generate-og-image.mjs
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

// Fundo: gradiente azul-royal (topo-esquerda) -> azul-escuro (baixo-direita)
const c1 = [29, 78, 216]; // #1D4ED8
const c2 = [23, 36, 84]; // #172454

const px = new Uint8Array(W * H * 3);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    const i = (y * W + x) * 3;
    px[i] = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    px[i + 1] = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    px[i + 2] = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  }
}

function setPixel(x, y, color) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 3;
  px[i] = color[0];
  px[i + 1] = color[1];
  px[i + 2] = color[2];
}

/** Fonte bitmap 5x7 maiúscula */
const FONT = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  '·': ['00000', '00000', '00000', '01100', '01100', '00000', '00000'],
};

function drawText(text, x0, y0, scale, color) {
  let x = x0;
  for (const ch of text.toUpperCase()) {
    const glyph = FONT[ch];
    if (!glyph) {
      x += 6 * scale;
      continue;
    }
    for (let gy = 0; gy < 7; gy++) {
      for (let gx = 0; gx < 5; gx++) {
        if (glyph[gy][gx] === '1') {
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              setPixel(x + gx * scale + sx, y0 + gy * scale + sy, color);
            }
          }
        }
      }
    }
    x += 6 * scale;
  }
  return x;
}

const WHITE = [255, 255, 255];
const MINT = [125, 211, 200]; // acento turquesa

// Título centralizado
const title = 'MARCA LAB';
const titleWidth = title.length * 6 * 16 - 16; // 16px por célula
drawText(title, Math.round((W - titleWidth) / 2), 210, 16, WHITE);

// Linha turquesa decorativa
const lineY = 340;
for (let x = 300; x < 900; x++) {
  for (let s = 0; s < 4; s++) setPixel(x, lineY + s, MINT);
}

// Subtítulo
const subtitle = 'SUPLEMENTOS WHITE LABEL';
const subWidth = subtitle.length * 6 * 6 - 6;
drawText(subtitle, Math.round((W - subWidth) / 2), 400, 6, [203, 213, 225]);

const tagline = 'SUA MARCA · NOSSA CIENCIA';
const tagWidth = tagline.length * 6 * 4 - 4;
drawText(tagline, Math.round((W - tagWidth) / 2), 480, 4, MINT);

// Borda superior turquesa
for (let x = 0; x < W; x++) {
  for (let s = 0; s < 8; s++) setPixel(x, s, MINT);
}

// ===== PNG encoding =====
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (const byte of buf) crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

// Filtro 0 (None) por scanline
const raw = Buffer.alloc((W * 3 + 1) * H);
for (let y = 0; y < H; y++) {
  raw[y * (W * 3 + 1)] = 0;
  Buffer.from(px.buffer, y * W * 3, W * 3).copy(raw, y * (W * 3 + 1) + 1);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: RGB
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'og-image.png'), png);
console.log(`og-image.png gerado (${W}x${H}, ${(png.length / 1024).toFixed(1)} KB)`);
