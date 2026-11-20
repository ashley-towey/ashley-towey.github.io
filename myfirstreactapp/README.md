# Ashley Towey — portfolio

The React + Vite source for the redesigned portfolio. Until it replaces the
legacy site, it is deployed to `/preview/` (see `base` in `vite.config.js`).

## Commands

```sh
npm install         # once
npm run dev         # local dev server → http://localhost:5173/preview/
npm test            # Vitest suite
npm run build       # production build + prerender → dist/
npm run preview     # serve dist/ locally
npm run images      # regenerate web images from assets-src/ (see below)
```

CI (`.github/workflows/static.yml`) runs `npm run build:preview`, which builds and
copies `dist/` to the repository-level `preview/` folder. That folder is not
committed.

## How it fits together

- `src/data/projects.js` — every project, in display order.
- `src/config/site.js` — name, email and social links (single source).
- `src/routes.js` — page titles/descriptions and the list of routes to prerender.
- `src/pages/` — Home, Project (`/work/:slug/`), About, NotFound.
- `src/components/` — shared UI (ButtonLink, ThemeToggle, Header, Footer, …).
- `src/styles/` — design tokens, base typography, and the layout/framing system.
- `scripts/prerender.mjs` — after the build, renders every route to its own
  `index.html` with per-page `<title>`, description, canonical and Open Graph tags.

Old hash links such as `/#/project/slate` redirect to `/work/slate/`.

The theme is chosen before first paint by an inline script in `index.html`:
a saved choice wins, otherwise the visitor's OS light/dark preference.

## Images

Original photos live in `assets-src/portfolio/<folder>/`. That folder is
git-ignored because the originals are large; keep your own copy of it. The legacy
site's `img/` folder and git history also hold the originals used so far.

`npm run images` writes resized AVIF/WebP (800 and 1600px wide) plus a JPEG to
`public/portfolio/` and records sizes in `src/data/image-manifest.json`. Those
outputs are committed. In code, refer to an image by its original path, e.g.
`'SLATE/slate-box-1.jpg'`, and render it with `<Picture>`. The test suite fails
if an image is referenced but hasn't been generated.

To add a project: drop its originals into `assets-src/portfolio/<folder>/`, run
`npm run images`, then add an entry to `src/data/projects.js`.

`assets-src/portfolio/favicon.jpg` is the source for the favicon and app icons
in `public/icons/`.
