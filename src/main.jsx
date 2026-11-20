import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { getProject } from './data/projects';
import { basename, projectPath } from './lib/paths';

// Old preview links used hash routes (#/project/slug, #/about). Send them to
// the matching clean URL before React starts.
const legacy = window.location.hash.match(/^#\/(?:project\/([^/?#]+)|(about))/);
if (legacy) {
  const project = legacy[1] && getProject(legacy[1]);
  const path = legacy[1] ? (project ? projectPath(project) : '/') : '/about/';
  window.history.replaceState(null, '', basename + path);
}

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Production pages are prerendered, so hydrate them. In dev (or after a
// legacy redirect changed the route) render from scratch.
if (container.hasChildNodes() && !legacy) {
  hydrateRoot(container, app);
} else {
  container.textContent = '';
  createRoot(container).render(app);
}
