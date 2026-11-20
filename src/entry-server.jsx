import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { basename } from './lib/paths';

export { routeMeta, prerenderRoutes } from './routes';

// Render one route to HTML for the build-time prerender step.
export function render(path) {
  return renderToString(
    <StaticRouter basename={basename} location={basename + path}>
      <App />
    </StaticRouter>
  );
}
export { site } from './config/site';
export { base } from './lib/paths';
export { projects, sectionOf } from './data/projects';
