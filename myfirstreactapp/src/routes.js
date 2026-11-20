import { site } from './config/site';
import { projects, getProject } from './data/projects';
import { shareImage } from './components/Picture';
import { projectPath } from './lib/paths';

const suffix = ` — ${site.name}`;

// Title, description and share image for a router pathname (no basename).
// Used by the client to set document.title and by the prerender step to
// write each page's <head>.
export function routeMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { title: `${site.name} — Selected work`, description: site.description };
  if (path === '/about') {
    return { title: `About${suffix}`, description: `About ${site.name}: designer, programmer and cyclist based in ${site.location}.` };
  }
  const match = path.match(/^\/work\/([^/]+)$/);
  const project = match && getProject(match[1]);
  if (project) {
    return { title: `${project.title}${suffix}`, description: project.summary, image: shareImage(project.cover) };
  }
  return { title: `Page not found${suffix}`, description: site.description, notFound: true };
}

export function prerenderRoutes() {
  return ['/', '/about/', ...projects.map((project) => projectPath(project.slug))];
}
