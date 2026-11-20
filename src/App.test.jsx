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
import { CATEGORIES, getProject, projectClips, projectHero, projectImages, projects, projectsIn, projectsInCategory } from './data/projects';
import { VIEW_KEY } from './pages/Home';
import { projectPath } from './lib/paths';
import { prerenderRoutes, routeMeta } from './routes';

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe('home', () => {
  test('lists every project as a link to its page', () => {
    renderAt('/');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/^I design; websites,\[\d+\] products,\[\d+\] brands,\[\d+\] campaigns,\[\d+\] billboards,\[\d+\] etc\[0\]$/);
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

  test('heading counts match the projects in each category, and each opens a list of links', () => {
    renderAt('/');
    for (const { key, label } of CATEGORIES) {
      const inCategory = projectsInCategory(key);
      const button = screen.getByRole('button', { name: `${label}, [${inCategory.length}]` });
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      inCategory.forEach((project) => expect(screen.getByRole('link', { name: project.title })).toHaveAttribute('href', projectPath(project)));
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
    expect(projects.every((project) => CATEGORIES.some((c) => c.key === project.category))).toBe(true);
  });

  test('grid and list views switch and remember the choice', () => {
    window.localStorage.removeItem(VIEW_KEY);
    renderAt('/');
    const grid = screen.getByRole('button', { name: 'Grid' });
    const list = screen.getByRole('button', { name: 'List' });
    expect(grid).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(list);
    expect(list).toHaveAttribute('aria-pressed', 'true');
    expect(grid).toHaveAttribute('aria-pressed', 'false');
    expect(window.localStorage.getItem(VIEW_KEY)).toBe('list');
    const region = screen.getByRole('region', { name: 'Selected projects' });
    expect(within(region).getAllByRole('link')).toHaveLength(projectsIn('work').length);
    expect(region).toHaveClass('home-projects--list');
    cleanup();
    renderAt('/');
    expect(screen.getByRole('button', { name: 'List' })).toHaveAttribute('aria-pressed', 'true');
    window.localStorage.removeItem(VIEW_KEY);
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

  test('the intro shows the year and hero image, and no client or disciplines', () => {
    const slate = getProject('slate');
    renderAt(projectPath(slate));
    expect(screen.getByText(slate.year)).toHaveClass('project-intro__year');
    const hero = projectHero(slate);
    expect(hero.src).toBe('SLATE/slate-2.jpg');
    expect(screen.getAllByAltText(hero.alt)).toHaveLength(1);
    expect(screen.queryByText('Client')).not.toBeInTheDocument();
    expect(screen.queryByText('Disciplines')).not.toBeInTheDocument();
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
    expect(screen.getByText('Next experiment')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All experiments' })).toHaveAttribute('href', '/experiments/');
  });

  test('the footer links to experiments, contact and LinkedIn, and marks the current page', () => {
    renderAt('/experiments/');
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/');
    expect(within(footer).getByRole('link', { name: 'Portfolio' })).not.toHaveAttribute('aria-current');
    expect(within(footer).getByRole('link', { name: 'Experiments' })).toHaveAttribute('aria-current', 'page');
    expect(within(footer).getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/about/');
    expect(within(footer).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', site.socials.find((s) => s.label === 'LinkedIn').href);
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

test('clicking a dot in the footer wordmark turns it orange, and clicking again turns it back', () => {
  renderAt('/');
  const dots = document.querySelectorAll('.dot-wordmark__dot');
  expect(dots.length).toBeGreaterThan(40);
  fireEvent.click(dots[10]);
  expect(dots[10]).toHaveClass('dot-wordmark__dot--lit');
  expect(dots[11]).not.toHaveClass('dot-wordmark__dot--lit');
  fireEvent.click(dots[10]);
  expect(dots[10]).not.toHaveClass('dot-wordmark__dot--lit');
});
