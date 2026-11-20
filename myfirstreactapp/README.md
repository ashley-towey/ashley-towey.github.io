# Ashley Towey Portfolio Preview

This React app is a review version of the portfolio. It runs separately from the existing static website, which remains unchanged. The production preview lives at `/preview/` when the build output is deployed with the rest of the repository.

## Run locally

From this folder, run:

```sh
npm run dev
```

Then open [http://localhost:5173/preview/](http://localhost:5173/preview/). The page refreshes as you edit the React source. Project pages use hash routes such as `/#/project/slate`, and the about/contact page is at `/#/about`.

## Deploy the live preview

The GitHub Pages workflow builds this app from source and writes the static output to the repository-level `preview/` directory before publishing the site. You only need to commit changes to this app's source; the generated bundles are created during deployment. The app uses hash routes so project pages work when opened or refreshed on GitHub Pages.

To generate the production output locally, run `npm run build:preview` from this folder.

The app is built with Vite. Run `npm install` once, then `npm test` to run the Vitest suite.
