import fs from 'node:fs';
import path from 'node:path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { legacyRedirects } from '../scripts/legacy-redirects.mjs';
import { site } from './config/site';
import manifest from './data/image-manifest.json';
import videoManifest from './data/video-manifest.json';
import { projectClips, projectImages, projects, projectsIn } from './data/projects';
import { projectPath } from './lib/paths';
import { prerenderRoutes, routeMeta } from './routes';

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe('home', () => {
  test('lists every project as a link to its page', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("I design: websites, products, brands, campaigns, billboards, etc");
    const grid = screen.getByRole('region', { name: 'Selected projects' });
    const links = within(grid).getAllByRole('link');
    const work = projectsIn('work');
    expect(links).toHaveLength(work.length);
    expect(links[0]).toHaveAttribute('href', projectPath(work[0]));
  });

  test('has an h2 between the h1 and the project card h3s', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 2, name: 'All projects' })).toBeInTheDocument();
  });
});

describe('project pages', () => {
  test.each(projects.map((p) => [projectPath(p), p]))('%s renders its project', (path, project) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
  });

  test.each(['work', 'experiments'])('next link stays within %s and wraps round', (section) => {
    const list = projectsIn(section);
    renderAt(projectPath(list[0]));
    expect(screen.getByRole('link', { name: list[1].title })).toHaveAttribute('href', projectPath(list[1]));
    cleanup();
    renderAt(projectPath(list.at(-1)));
    expect(screen.getByRole('link', { name: list[0].title })).toHaveAttribute('href', projectPath(list[0]));
  });

  test('a project is only reachable under its own section', () => {
    const experiment = projectsIn('experiments')[0];
    renderAt(`/work/${experiment.slug}/`);
    expect(screen.getByText('Project not found')).toBeInTheDocument();
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

describe('project content', () => {
  test.each(projects.map((p) => [p.slug, p]))('%s has complete content', (slug, project) => {
    expect(project.summary.length).toBeGreaterThan(40);
    expect(Array.isArray(project.description)).toBe(true);
    expect(project.alt).toBeTruthy();
    for (const block of project.blocks) {
      expect(['images', 'text', 'quote', 'video']).toContain(block.type);
      if (block.type === 'images') block.images.forEach((image) => expect(image.alt, image.src ?? image.clip).toMatch(/\w{3,}/));
      if (block.type === 'text') expect(block.heading).toBeTruthy();
    }
  });

  test('project pages render text, quotes, captions and videos from blocks', () => {
    renderAt('/work/jupiter-heating/');
    expect(screen.getByText(/Chris Kollmer, Jupiter Heating Solutions/)).toBeInTheDocument();
    expect(screen.getByText('Pre-existing imagery')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Live website/ })).toHaveAttribute('target', '_blank');
    cleanup();
    renderAt('/experiments/think-twice/');
    expect(screen.getByRole('heading', { level: 2, name: 'User research' })).toBeInTheDocument();
    expect(screen.getByTitle('Paper prototyping')).toHaveAttribute('src', expect.stringContaining('player.vimeo.com/video/930220535'));
    expect(screen.getByText(/In collaboration with/)).toBeInTheDocument();
  });
});

describe('routes and metadata', () => {
  test('every project has a unique slug', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  test('prerender list covers home, about and every project', () => {
    expect(prerenderRoutes()).toEqual(['/', '/about/', '/experiments/', ...projects.map(projectPath)]);
  });

  test('project pages get their own title, description and share image', () => {
    const meta = routeMeta(projectPath(projects[0]));
    expect(meta.title).toBe(`${projects[0].title} — Ashley Towey`);
    expect(meta.description).toBe(projects[0].summary);
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
  const images = projects.flatMap(projectImages).concat('about/headshot_1.jpg');
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

describe('experiments', () => {
  test('lists exactly the experiment projects, and they are not on the home page', () => {
    const experiments = projectsIn('experiments');
    expect(experiments.map((p) => p.slug)).toEqual(['velocafe', 'networked-beings', 'think-twice', 'stories-for-the-road']);
    renderAt('/experiments/');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    const links = within(screen.getByRole('region', { name: 'Experiments' })).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual(experiments.map(projectPath));
    cleanup();
    renderAt('/');
    const home = within(screen.getByRole('region', { name: 'Selected projects' }));
    experiments.forEach((p) => expect(home.queryByRole('link', { name: new RegExp(p.title) })).not.toBeInTheDocument());
  });

  test('experiment pages are labelled as experiments', () => {
    renderAt('/experiments/think-twice/');
    expect(screen.getByText(/^Experiment \d+ \/ \d+$/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All experiments' })).toHaveAttribute('href', '/experiments/');
  });

  test('the footer has no email button on any page', () => {
    for (const path of ['/', '/about/', '/experiments/']) {
      renderAt(path);
      expect(within(screen.getByRole('contentinfo')).queryByRole('link', { name: 'Say hello' })).not.toBeInTheDocument();
      cleanup();
    }
  });

  test('the footer links to experiments', () => {
    renderAt('/');
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Experiments' })).toHaveAttribute('href', '/experiments/');
  });
});

test('every legacy redirect points at a prerendered page', () => {
  const routes = new Set(prerenderRoutes());
  const broken = Object.entries(legacyRedirects)
    .filter(([, to]) => !routes.has(to));
  expect(broken).toEqual([]);
});

test('every clip has a generated video and poster', () => {
  const dir = path.resolve(__dirname, '../public/portfolio');
  const clips = projects.flatMap(projectClips);
  expect(clips.length).toBeGreaterThan(0);
  const missing = clips.filter((clip) => {
    const stem = clip.replace(/\.[^.]+$/, '');
    return !videoManifest[clip] || !fs.existsSync(path.join(dir, `${stem}.mp4`)) || !fs.existsSync(path.join(dir, `${stem}-poster.jpg`));
  });
  expect(missing).toEqual([]);
});

test('CSM page renders its clips as muted, looping, inline videos with labels', () => {
  renderAt('/work/csm-showcase/');
  const video = screen.getByLabelText(/mirrored cube/);
  expect(video.tagName).toBe('VIDEO');
  expect(video.muted).toBe(true);
  expect(video).toHaveAttribute('loop');
  expect(video).toHaveAttribute('playsinline');
  expect(video).toHaveAttribute('poster', expect.stringContaining('idea-generation_1-poster.jpg'));
  expect(screen.getByText('Sharing & collaboration')).toBeInTheDocument();
});
