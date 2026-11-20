# ashleytowey.com

Portfolio of Ashley Towey: design, computing and creativity. Built with React +
Vite, prerendered to static HTML, and deployed to GitHub Pages.

The previous static site is archived at the `legacy-site-2024` tag (and the
`legacy-site` branch): `git checkout legacy-site-2024`.

## Commands

```sh
npm install         # once
npm run dev         # local dev server → http://localhost:5173/
npm test            # Vitest suite
npm run build       # production build + prerender → dist/
npm run preview     # serve dist/ locally → http://localhost:4173/
npm run images      # regenerate web images from assets-src/ (see below)
npm run videos      # turn GIFs/videos in assets-src/ into small looping MP4s
```

Pushing to `main` runs `.github/workflows/static.yml`: install, test, build, and
deploy `dist/` to GitHub Pages. Pull requests run the same build and tests
without deploying.

## How it fits together

- `src/data/projects.js` — every project, in display order, with its content blocks.
  Projects marked `section: 'experiments'` appear on `/experiments/` (at
  `/experiments/<slug>/`); the rest are on the home page (at `/work/<slug>/`).
- `src/config/site.js` — name, email and social links (single source).
- `src/routes.js` — page titles/descriptions and the list of routes to prerender.
- `src/pages/` — Home, Experiments, Project, About, NotFound.
- `src/components/` — shared UI (ButtonLink, ThemeToggle, Picture, ProjectBlocks, …).
- `src/styles/` — design tokens, base typography, and the layout/framing system.
- `scripts/prerender.mjs` — after the build, renders every route to its own
  `index.html` with per-page `<title>`, description, canonical and Open Graph
  tags, writes `404.html`, and writes redirect pages for old URLs.
- `scripts/legacy-redirects.mjs` — old legacy-site URLs and where they now go.
- `public/CNAME` — custom domain for GitHub Pages.

The theme is chosen before first paint by an inline script in `index.html`:
a saved choice wins, otherwise the visitor's OS light/dark preference.

## Images

Original photos live in `assets-src/portfolio/<folder>/`. That folder is
git-ignored because the originals are large; keep your own copy of it. Originals
used so far are also in the legacy archive (`img/` at tag `legacy-site-2024`).

`npm run images` writes resized AVIF/WebP (800 and 1600px wide) plus a JPEG to
`public/portfolio/` and records sizes in `src/data/image-manifest.json`. Those
outputs are committed. In code, refer to an image by its original path, e.g.
`'SLATE/slate-box-1.jpg'`, and render it with `<Picture>`. The test suite fails
if an image is referenced but hasn't been generated.

To add a project: drop its originals into `assets-src/portfolio/<folder>/`, run
`npm run images`, then add an entry to `src/data/projects.js`.

`assets-src/portfolio/favicon.jpg` is the source for the favicon and app icons
in `public/icons/`.

## GIFs and videos

Put GIFs or videos in `assets-src/portfolio/<folder>/` and run `npm run videos`.
Each becomes a small, silent H.264 MP4 plus a poster frame in `public/portfolio/`
(GIFs typically shrink by ~95%), with sizes recorded in
`src/data/video-manifest.json`. Use one in a project's images block with
`{ clip: 'folder/file.gif', alt, caption }`. Clips loop silently while on screen
and show the poster with play controls for visitors who prefer reduced motion.
ffmpeg comes from the `ffmpeg-static` dev dependency, so there's nothing extra to install.
