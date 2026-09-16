/**
 * Baixa fotos CC0 (domínio público, uso comercial livre) do Openverse
 * para public/images/. Uso: node scripts/fetch-stock-images.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

/** [arquivo destino, termo de busca] */
const WANTED = [
  ['estrutura-laboratorio.jpg', 'laboratory scientist microscope'],
  ['estrutura-producao.jpg', 'factory production line worker'],
  ['estrutura-envase.jpg', 'pill capsules pharmaceutical'],
  ['estrutura-logistica.jpg', 'warehouse boxes logistics'],
  ['produto-creatina.jpg', 'protein powder scoop'],
  ['produto-whey.jpg', 'protein shake milkshake glass'],
  ['produto-capsulas.jpg', 'dietary supplement capsules bottle'],
  ['blog-negocios.jpg', 'business team meeting office'],
  ['blog-produtos.jpg', 'vitamins supplement bottles'],
  ['blog-marketing.jpg', 'social media smartphone marketing'],
  ['blog-mercado.jpg', 'gym fitness workout'],
];

async function search(term) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(term)}&page_size=20&license=cc0,pdm&extension=jpg&mature=false`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`busca falhou ${res.status}`);
  const data = await res.json();
  return data.results;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download falhou ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 30_000) throw new Error(`imagem muito pequena (${(buf.length / 1024).toFixed(0)} KB)`);
  writeFileSync(dest, buf);
  return buf.length;
}

const report = [];
for (const [file, term] of WANTED) {
  const dest = join(outDir, file);
  if (existsSync(dest)) {
    report.push(`${file}: já existe, pulado`);
    continue;
  }
  let ok = false;
  try {
    const results = await search(term);
    // preferir imagens paisagem com largura >= 900
    const sorted = results
      .filter((r) => r.url && (!r.width || r.width >= 900) && (!r.height || r.height >= 600))
      .sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
    for (const r of sorted.slice(0, 6)) {
      try {
        const size = await download(r.url, dest);
        report.push(`${file}: OK (${(size / 1024).toFixed(0)} KB) — "${r.title}" por ${r.creator} (${r.license}) — ${r.foreign_landing_url}`);
        ok = true;
        break;
      } catch {
        /* tenta a próxima */
      }
    }
  } catch (e) {
    report.push(`${file}: ERRO ${e.message}`);
  }
  if (!ok && !existsSync(dest)) report.push(`${file}: FALHOU (nenhuma imagem baixada)`);
  await new Promise((r) => setTimeout(r, 700));
}

console.log(report.join('\n'));
