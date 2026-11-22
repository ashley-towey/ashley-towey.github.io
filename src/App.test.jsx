import fs from 'node:fs';
import path from 'node:path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { vi } from 'vitest';
import App from './App';
import { FORMER_EXPERIMENT_PAGES, legacyRedirects } from '../scripts/legacy-redirects.mjs';
import { site } from './config/site';
import manifest from './data/image-manifest.json';
import videoManifest from './data/video-manifest.json';
import { HEADLINE, getProject, projectClips, projectHero, projectImages, projects } from './data/projects';
import { VIEW_KEY } from './pages/Home';
import { EXPERIMENTS, experimentImages } from './data/experiments';
import { projectPath } from './lib/paths';
import { prerenderRoutes, routeMeta } from './routes';

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe('home', () => {
  test('lists every project as a link to its page', () => {
    renderAt('/');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/^I design & build; websites,\[\d+\] products,\[\d+\] brands,\[\d+\] campaigns,\[\d+\] billboards,\[\d+\] etc\.\[\d+\]$/);
    const grid = screen.getByRole('region', { name: 'Selected projects' });
    const links = within(grid).getAllByRole('link');
    const work = projects;
    expect(links).toHaveLength(work.length);
    expect(links[0]).toHaveAttribute('href', projectPath(work[0]));
  });

  test('has an h2 between the h1 and the project card h3s', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 2, name: 'All projects' })).toBeInTheDocument();
  });

  test('each heading number links to its project, showing its place in the portfolio', () => {
    renderAt('/');
    const heading = screen.getByRole('heading', { level: 1 });
    const work = projects;
    for (const word of HEADLINE.filter((w) => w.project)) {
      const project = getProject(word.project);
      const link = within(heading).getByRole('link', { name: project.title });
      expect(link).toHaveAttribute('href', projectPath(project));
      expect(link).toHaveTextContent(`[${work.indexOf(project) + 1}]`);
    }
    const etc = within(heading).getByRole('link', { name: 'Experiments' });
    expect(etc).toHaveAttribute('href', '/experiments/');
    expect(etc).toHaveTextContent(`[${EXPERIMENTS.length}]`);
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
    expect(within(region).getAllByRole('link')).toHaveLength(projects.length);
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

  test('the next-project link wraps round', () => {
    const list = projects;
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

  test('experiments no longer have pages of their own', () => {
    renderAt('/experiments/velocafe/');
    expect(screen.getByText('Page not found')).toBeInTheDocument();
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

describe('about page', () => {
  afterEach(() => vi.unstubAllGlobals());

  test('has a contact form and no mailto links', () => {
    const { container } = renderAt('/about/');
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Send it!!!' })).toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(site.email).toBe('ashleytowey.design@gmail.com');
  });

  test('sending the form posts to Web3Forms and thanks the visitor', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) });
    vi.stubGlobal('fetch', fetchMock);
    const gtagMock = vi.fn();
    vi.stubGlobal('gtag', gtagMock);
    renderAt('/about/');
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send it!!!' }));
    expect(await screen.findByText(/Thanks for getting in touch/)).toBeInTheDocument();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(JSON.parse(options.body)).toMatchObject({ access_key: site.web3formsKey, name: 'Sam', email: 'sam@example.com', message: 'Hello' });
    expect(gtagMock).toHaveBeenCalledWith('event', 'generate_lead', { form_name: 'contact' });
  });

  test('a failed send shows an error and is not counted', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const gtagMock = vi.fn();
    vi.stubGlobal('gtag', gtagMock);
    renderAt('/about/');
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send it!!!' }));
    expect(await screen.findByText(/Something went wrong/)).toBeInTheDocument();
    expect(gtagMock).not.toHaveBeenCalled();
  });
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

  test('project pages render text, quotes, captions and credits from blocks', () => {
    renderAt('/work/jupiter-heating/');
    expect(screen.getByText(/Chris Kollmer, Jupiter Heating Solutions/)).toBeInTheDocument();
    expect(screen.getByText('Pre-existing imagery')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Live website/ })).toHaveAttribute('target', '_blank');
    cleanup();
    renderAt('/work/csm-showcase/');
    expect(screen.getByRole('heading', { level: 2, name: 'Concept' })).toBeInTheDocument();
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
    expect(meta.title).toBe(`${projects[0].title} | Ashley Towey`);
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
  const images = projects.flatMap(projectImages).concat(experimentImages(), 'about/headshot_2.jpg');
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
  test('lists every experiment, numbered, with no links away', () => {
    renderAt('/experiments/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^Experiments;/);
    const list = within(screen.getByRole('region', { name: 'Experiments' }));
    expect(list.getAllByRole('listitem')).toHaveLength(EXPERIMENTS.length);
    expect(list.getByText('001')).toBeInTheDocument();
    expect(list.getByText(EXPERIMENTS[0].title)).toBeInTheDocument();
    // Rows don't navigate anywhere; only TRY IT buttons open something.
    expect(list.queryAllByRole('link')).toHaveLength(0);
    expect(list.queryAllByRole('button', { name: /^Try / }).map((b) => b.getAttribute('aria-label'))).toEqual(EXPERIMENTS.filter((e) => e.tryIt).map((e) => `Try ${e.title}`));
  });

  test('clicking a row makes it the active experiment', () => {
    renderAt('/experiments/');
    const [first, second] = screen.getAllByRole('button', { pressed: false }).filter((b) => b.classList.contains('experiment-row__main'));
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(second);
    expect(first).toHaveAttribute('aria-pressed', 'false');
    expect(second).toHaveAttribute('aria-pressed', 'true');
  });

  test('experiment titles are unique (they key the list)', () => {
    expect(new Set(EXPERIMENTS.map((e) => e.title)).size).toBe(EXPERIMENTS.length);
  });

  test('a TRY IT button opens the code experiment in a modal, and Escape closes it', () => {
    EXPERIMENTS.push({ title: 'Test sketch', tryIt: 'https://example.com/sketch' });
    try {
      renderAt('/experiments/');
      fireEvent.click(screen.getByRole('button', { name: 'Try Test sketch' }));
      const dialog = screen.getByRole('dialog', { name: 'Test sketch' });
      expect(within(dialog).getByTitle('Test sketch')).toHaveAttribute('src', 'https://example.com/sketch');
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    } finally {
      EXPERIMENTS.pop();
    }
  });

  test('Generative Identity can be tried in a modal', () => {
    renderAt('/experiments/');
    fireEvent.click(screen.getByRole('button', { name: 'Try Generative Identity' }));
    expect(within(screen.getByRole('dialog', { name: 'Generative Identity' })).getByTitle('Generative Identity'))
      .toHaveAttribute('src', '/sketches/generative-identity/index.html');
  });

  test('Stories for the Road can be tried in a modal', () => {
    renderAt('/experiments/');
    fireEvent.click(screen.getByRole('button', { name: 'Try Stories for the Road' }));
    expect(within(screen.getByRole('dialog', { name: 'Stories for the Road' })).getByTitle('Stories for the Road'))
      .toHaveAttribute('src', '/sketches/stories-for-the-road/index.html');
  });

  test('CSM identity experiment can be tried in a modal', () => {
    renderAt('/experiments/');
    fireEvent.click(screen.getByRole('button', { name: 'Try CSM identity experiment' }));
    expect(within(screen.getByRole('dialog', { name: 'CSM identity experiment' })).getByTitle('CSM identity experiment'))
      .toHaveAttribute('src', '/sketches/csm-identity/index.html');
  });

  test('every TRY IT sketch in public/ exists', () => {
    const local = EXPERIMENTS.filter((e) => e.tryIt?.startsWith('/'));
    local.forEach((e) => expect(fs.existsSync(path.resolve(__dirname, '../public', `.${e.tryIt}`)), e.tryIt).toBe(true));
  });

  test('the footer links to experiments, contact and LinkedIn, and marks the current page', () => {
    renderAt('/experiments/');
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/');
    expect(within(footer).getByRole('link', { name: 'Portfolio' })).not.toHaveAttribute('aria-current');
    expect(within(footer).getByRole('link', { name: 'Experiments' })).toHaveAttribute('aria-current', 'page');
    expect(within(footer).getByRole('link', { name: 'Contact me' })).toHaveAttribute('href', '/about/');
    expect(within(footer).queryByRole('link', { name: 'Email' })).toBeNull();
    expect(footer.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(within(footer).getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', site.socials.find((s) => s.label === 'Instagram').href);
    expect(within(footer).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', site.socials.find((s) => s.label === 'LinkedIn').href);
  });

  test('the footer links to experiments', () => {
    renderAt('/');
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Experiments' })).toHaveAttribute('href', '/experiments/');
  });
});

test('old experiment pages are redirected to the experiments page', () => {
  expect(FORMER_EXPERIMENT_PAGES.length).toBeGreaterThan(0);
  expect(prerenderRoutes()).toContain('/experiments/');
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
  expect(dots).toHaveLength(76);
  fireEvent.click(dots[10]);
  expect(dots[10]).toHaveClass('dot-wordmark__dot--lit');
  expect(dots[11]).not.toHaveClass('dot-wordmark__dot--lit');
  fireEvent.click(dots[10]);
  expect(dots[10]).not.toHaveClass('dot-wordmark__dot--lit');
});
