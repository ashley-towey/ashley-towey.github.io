// Turns the original photos in assets-src/portfolio/ into web-sized versions in
// public/portfolio/, and records each image's size in src/data/image-manifest.json
// so <Picture> can set srcset, sizes and width/height.
//
//   npm run images
//
// Originals stay out of git (assets-src/ is ignored); the generated files are
// committed. Re-running only processes images that are new or have changed.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(root, 'assets-src/portfolio');
const outDir = path.join(root, 'public/portfolio');
const manifestFile = path.join(root, 'src/data/image-manifest.json');
const WIDTHS = [800, 1600];
const FAVICON = 'favicon.jpg';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(jpe?g|png)$/i.test(entry.name) ? [full] : [];
  }));
  return files.flat();
}

const stem = (rel) => rel.replace(/\.[^.]+$/, '');
const isFresh = async (out, src) => {
  try { return (await fs.stat(out)).mtimeMs >= (await fs.stat(src)).mtimeMs; } catch { return false; }
};

let manifest = {};
try { manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8')); } catch { /* first run */ }

const files = await walk(srcDir);
const next = {};
let processed = 0;

for (const file of files) {
  const rel = path.relative(srcDir, file).split(path.sep).join('/');
  if (rel === FAVICON) continue;
  const image = sharp(file).rotate(); // apply EXIF orientation
  const { width, height } = await image.metadata().then((m) => (m.orientation >= 5 ? { width: m.height, height: m.width } : m));
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];
  next[rel] = { width, height, widths };

  const largest = path.join(outDir, `${stem(rel)}-${widths.at(-1)}.jpg`);
  if (manifest[rel] && await isFresh(largest, file)) continue;

  await fs.mkdir(path.dirname(largest), { recursive: true });
  for (const w of widths) {
    const resized = image.clone().resize({ width: w, withoutEnlargement: true });
    const base = path.join(outDir, `${stem(rel)}-${w}`);
    await resized.clone().avif({ quality: 50, effort: 4 }).toFile(`${base}.avif`);
    await resized.clone().webp({ quality: 76 }).toFile(`${base}.webp`);
    if (w === widths.at(-1)) await resized.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${base}.jpg`);
  }
  processed += 1;
  console.log(`✓ ${rel}`);
}

// Favicon and app icons.
const favicon = path.join(srcDir, FAVICON);
const iconDir = path.join(root, 'public/icons');
await fs.mkdir(iconDir, { recursive: true });
for (const [name, size] of [['icon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(favicon).resize(size, size, { fit: 'cover' }).png().toFile(path.join(iconDir, name));
}

const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
const lines = Object.entries(sorted).map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`);
await fs.writeFile(manifestFile, `{\n${lines.join(',\n')}\n}\n`);
console.log(`${processed} image(s) processed, ${files.length - 1} in manifest`);
