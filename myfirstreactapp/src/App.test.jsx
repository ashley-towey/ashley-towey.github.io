import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { site } from './config/site';
import manifest from './data/image-manifest.json';
import { projects } from './data/projects';
import { projectPath } from './lib/paths';
import { prerenderRoutes, routeMeta } from './routes';

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe('home', () => {
  test('lists every project as a link to its page', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/projects by Ashley Towey/i);
    const grid = screen.getByRole('region', { name: 'Selected projects' });
    const links = within(grid).getAllByRole('link');
    expect(links).toHaveLength(projects.length);
    expect(links[0]).toHaveAttribute('href', projectPath(projects[0].slug));
  });

  test('has an h2 between the h1 and the project card h3s', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 2, name: 'All projects' })).toBeInTheDocument();
  });
});

describe('project pages', () => {
  test.each(projects.map((p) => [p.slug, p]))('/work/%s renders its project', (slug, project) => {
    renderAt(projectPath(slug));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
  });

  test('next project is a real link to the following project', () => {
    renderAt(projectPath(projects[0].slug));
    const next = screen.getByRole('link', { name: projects[1].title });
    expect(next).toHaveAttribute('href', projectPath(projects[1].slug));
  });

  test('the last project links back round to the first', () => {
    renderAt(projectPath(projects.at(-1).slug));
    expect(screen.getByRole('link', { name: projects[0].title })).toBeInTheDocument();
  });

  test('an unknown slug shows the not-found page', () => {
    renderAt('/work/does-not-exist/');
    expect(screen.getByText('Project not found')).toBeInTheDocument();
  });
});

test('unknown routes show the not-found page', () => {
  renderAt('/nope');
  expect(screen.getByText('Page not found')).toBeInTheDocument();
});

test('about page uses the canonical contact email', () => {
  renderAt('/about/');
  expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', `mailto:${site.email}`);
  expect(site.email).toBe('ashleytowey.design@gmail.com');
});

test('theme toggle flips the document theme and remembers it', () => {
  document.documentElement.dataset.theme = 'light';
  renderAt('/');
  const toggle = screen.getByRole('button', { name: 'Dark theme' });
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(toggle);
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
  fireEvent.click(toggle);
  expect(document.documentElement.dataset.theme).toBe('light');
});

describe('routes and metadata', () => {
  test('every project has a unique slug', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  test('prerender list covers home, about and every project', () => {
    expect(prerenderRoutes()).toEqual(['/', '/about/', ...projects.map((p) => projectPath(p.slug))]);
  });

  test('project pages get their own title, description and share image', () => {
    const meta = routeMeta(projectPath(projects[0].slug));
    expect(meta.title).toBe(`${projects[0].title} — Ashley Towey`);
    expect(meta.description).toBe(projects[0].description);
    expect(meta.image).toContain(projects[0].cover.replace(/\.[^.]+$/, '-'));
    expect(meta.image).toMatch(/\.jpg$/);
  });

  test('each route renders on the server without errors', () => {
    for (const route of prerenderRoutes()) {
      const html = renderToString(<StaticRouter location={route}><App /></StaticRouter>);
      expect(html).toContain('<main id="main"');
    }
  });
});

test('every referenced image has generated variants in public/portfolio', () => {
  const dir = path.resolve(__dirname, '../public/portfolio');
  const images = projects.flatMap((p) => [p.cover, ...p.gallery]).concat('about-profile.jpeg');
  const notInManifest = images.filter((image) => !manifest[image]);
  expect(notInManifest).toEqual([]);
  const missingFiles = images.flatMap((image) => {
    const stem = image.replace(/\.[^.]+$/, '');
    const { widths } = manifest[image];
    const files = widths.flatMap((w) => [`${stem}-${w}.avif`, `${stem}-${w}.webp`]).concat(`${stem}-${widths.at(-1)}.jpg`);
    return files.filter((file) => !fs.existsSync(path.join(dir, file)));
  });
  expect(missingFiles).toEqual([]);
});
