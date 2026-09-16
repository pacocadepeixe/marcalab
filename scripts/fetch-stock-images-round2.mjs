/**
 * Round 2: baixa fotos CC0/PDM restantes do Openverse.
 * Uso: node scripts/fetch-stock-images-round2.mjs
 */
import { mkdirSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

/** [arquivo, [termos alternativos em ordem]] */
const WANTED = [
  ['produto-creatina.jpg', ['protein powder bowl', 'protein powder', 'whey protein powder']],
  ['produto-whey.jpg', ['protein shake glass', 'protein smoothie', 'milkshake glass']],
  ['produto-capsulas.jpg', ['vitamin pills bottle', 'supplement capsules', 'pills bottle white']],
  ['blog-produtos.jpg', ['supplement pills', 'vitamin tablets', 'vitamin bottles']],
  ['blog-marketing.jpg', ['smartphone social media', 'phone apps hands', 'smartphone marketing']],
];

async function search(term) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(term)}&page_size=20&license=cc0,pdm&extension=jpg&mature=false`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`busca falhou ${res.status}`);
  return (await res.json()).results;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 30_000) throw new Error('pequena demais');
  if (!buf[0] || buf[0] !== 0xff) throw new Error('não é JPEG');
  writeFileSync(dest, buf);
  return buf.length;
}

const report = [];
for (const [file, terms] of WANTED) {
  const dest = join(outDir, file);
  if (existsSync(dest)) {
    report.push(`${file}: já existe, pulado`);
    continue;
  }
  let ok = false;
  outer: for (const term of terms) {
    try {
      const results = await search(term);
      const candidates = results
        .filter(
          (r) =>
            r.url &&
            (!r.width || (r.width >= 800 && r.width <= 6000)) &&
            !/vector|clipart|illustration|sticker/i.test(r.title ?? '')
        )
        .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
      for (const r of candidates.slice(0, 8)) {
        try {
          const size = await download(r.url, dest);
          report.push(`${file}: OK (${(size / 1024).toFixed(0)} KB) — "${r.title}" (${r.license}, ${r.provider})`);
          ok = true;
          break outer;
        } catch {
          /* próxima candidata */
        }
      }
    } catch {
      /* próximo termo */
    }
    await new Promise((r2) => setTimeout(r2, 600));
  }
  if (!ok) report.push(`${file}: FALHOU`);
}

// remove clipart antigo se ainda presente
const bad = join(outDir, 'blog-produtos.jpg');
console.log(report.join('\n'));
