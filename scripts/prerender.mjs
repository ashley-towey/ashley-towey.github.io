// Build step: render every route to static HTML so each page has its own URL,
// title and share metadata, and content is visible before JavaScript runs.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { legacyRedirects } from './legacy-redirects.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routeMeta, prerenderRoutes, site, base, projects, sectionOf } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const escape = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(route, outFile) {
  const meta = routeMeta(route);
  const url = `${site.url}${base}${route.replace(/^\//, '')}`;
  const image = meta.image ? `${site.url}${encodeURI(meta.image)}` : null;
  const head = [
    meta.notFound ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${escape(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    meta.notFound ? '' : `<meta property="og:url" content="${escape(url)}" />`,
    image ? `<meta property="og:image" content="${escape(image)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
  ].filter(Boolean).join('\n    ');

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(meta.description)}" />`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', render(route));
  return fs.mkdir(path.dirname(outFile), { recursive: true }).then(() => fs.writeFile(outFile, html));
}

const routes = prerenderRoutes();
await Promise.all(routes.map((route) => page(route, path.join(dist, route, 'index.html'))));
await page('/404/', path.join(dist, '404.html'));

// Redirect pages for old URLs. Meta refresh works without JavaScript; the
// script keeps any #hash (old #/project/ links are handled by the app).
function redirectPage(target) {
  const url = escape(`${site.url}${target}`);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved</title>
<meta name="robots" content="noindex"><link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${escape(target)}">
<script>location.replace(${JSON.stringify(target)} + location.hash)</script>
</head><body><p>This page has moved to <a href="${escape(target)}">${url}</a>.</p></body></html>
`;
}

const redirects = {
  ...legacyRedirects,
  // The new site was previewed under /preview/ before launch.
  ...Object.fromEntries(routes.map((route) => [`preview${route}index.html`, route])),
  // Experiments were previewed at /work/<slug>/ before getting their own section.
  ...Object.fromEntries(projects.filter((p) => sectionOf(p) === 'experiments').flatMap((p) => [
    [`work/${p.slug}/index.html`, `/experiments/${p.slug}/`],
    [`preview/work/${p.slug}/index.html`, `/experiments/${p.slug}/`],
  ])),
};
await Promise.all(Object.entries(redirects).map(async ([from, to]) => {
  const file = path.join(dist, from);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, redirectPage(base.replace(/\/$/, '') + to));
}));

await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${routes.length} routes + 404.html, ${Object.keys(redirects).length} redirects`);
