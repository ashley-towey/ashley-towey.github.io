// Turns GIFs and videos in assets-src/portfolio/ into small, silent, web-ready
// MP4s (H.264) plus a poster frame in public/portfolio/, and records sizes in
// src/data/video-manifest.json for <Clip>.
//
//   npm run videos
//
// Uses the ffmpeg binary from the ffmpeg-static dev dependency. Re-running only
// processes files that are new or have changed.
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';

const run = promisify(execFile);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(root, 'assets-src/portfolio');
const outDir = path.join(root, 'public/portfolio');
const manifestFile = path.join(root, 'src/data/video-manifest.json');
const MAX_WIDTH = 1280;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.(gif|mp4|mov)$/i.test(entry.name) ? [full] : [];
  }));
  return files.flat();
}

const stem = (rel) => rel.replace(/\.[^.]+$/, '');
const isFresh = async (out, src) => {
  try { return (await fs.stat(out)).mtimeMs >= (await fs.stat(src)).mtimeMs; } catch { return false; }
};

// ffmpeg prints stream info to stderr; read the frame size and duration from it.
async function probe(file) {
  const { stderr } = await run(ffmpeg, ['-hide_banner', '-i', file]).catch((error) => error);
  const [, width, height] = stderr.match(/Video:.*?(\d{2,5})x(\d{2,5})/);
  const [, h, m, sec] = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return { width: Number(width), height: Number(height), duration: Number(h) * 3600 + Number(m) * 60 + Number(sec) };
}

let manifest = {};
try { manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8')); } catch { /* first run */ }

const next = {};
for (const file of await walk(srcDir)) {
  const rel = path.relative(srcDir, file).split(path.sep).join('/');
  const video = path.join(outDir, `${stem(rel)}.mp4`);
  const poster = path.join(outDir, `${stem(rel)}-poster.jpg`);

  if (!(manifest[rel] && await isFresh(video, file))) {
    await fs.mkdir(path.dirname(video), { recursive: true });
    await run(ffmpeg, [
      '-y', '-hide_banner', '-loglevel', 'error', '-i', file,
      '-an', // clips play muted, so drop any audio
      '-vf', `scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-movflags', '+faststart',
      video,
    ]);
    // Poster from the middle of the clip; first frames are often empty.
    const { duration } = await probe(video);
    await run(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-ss', String(duration / 2), '-i', video, '-frames:v', '1', '-q:v', '3', poster]);
    console.log(`✓ ${rel}`);
  }
  const { width, height } = await probe(video);
  next[rel] = { width, height };
}

const sorted = Object.entries(next).sort(([a], [b]) => a.localeCompare(b));
const lines = sorted.map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`);
await fs.writeFile(manifestFile, `{\n${lines.join(',\n')}\n}\n`);
console.log(`${sorted.length} clip(s) in manifest`);
