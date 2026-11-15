# Ashley Towey Portfolio Preview

This React app is a review version of the portfolio. It runs separately from the existing static website, which remains unchanged. The production preview lives at `/preview/` when the build output is deployed with the rest of the repository.

## Run locally

From this folder, run:

```sh
npm start
```

Then open [http://localhost:3000](http://localhost:3000). The page refreshes as you edit the React source. Project pages use hash routes such as `/#/project/slate`, and the about/contact page is at `/#/about`.

## Prepare the live preview

Run `npm run build:preview` from this folder. It writes a static build to the repository-level `preview/` directory. The existing GitHub Pages workflow publishes that directory with the rest of the site, and the React app uses hash routes so project pages also work when opened or refreshed on GitHub Pages.

The app uses the existing Create React App dependencies in this folder. No additional installation is needed on this machine.
