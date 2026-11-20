// Old URLs from the legacy static site (archived at tag legacy-site-2024) and
// the /preview/ era, mapped to their new home. The prerender step writes a
// tiny redirect page at each old path so existing links keep working.

const EXPERIMENTS = '/experiments/';

export const legacyRedirects = {
  // Case studies
  'site-map/prj-pages/csm-show.html': '/work/csm-showcase/',
  'site-map/prj-pages/domestique-displays.html': '/work/domestique-display/',
  'site-map/prj-pages/jupiter.html': '/work/jupiter-heating/',
  'site-map/prj-pages/kalas-l2p.html': '/work/london-to-paris/',
  'site-map/prj-pages/leanne-prosvic.html': '/work/leanne-prosvic/',
  'site-map/prj-pages/networked-beings.html': '/experiments/networked-beings/',
  'site-map/prj-pages/slate.html': '/work/slate/',
  'site-map/prj-pages/think-twice.html': '/experiments/think-twice/',
  'site-map/prj-pages/velocafe.html': '/experiments/velocafe/',
  'velocafe/velocafe.html': '/experiments/velocafe/',
  'projects/velocafe.html': '/experiments/velocafe/',
  'project_stories/landing.html': '/experiments/stories-for-the-road/',
  'project_stories/computer.html': '/experiments/stories-for-the-road/',
  'project_stories/phone.html': '/experiments/stories-for-the-road/',

  // Pages
  'site-map/site-contact.html': '/about/',
  'pages/contact.html': '/about/',
  'pages/index.html': '/',
  'pages/renders.html': '/',
  'site-map/site-creative-computing.html': EXPERIMENTS,
  'pages/creative-computing.html': EXPERIMENTS,
  'pages/playground.html': EXPERIMENTS,
  '404-page-not-found.html': '/',

  // Coding experiments
  ...Object.fromEntries([
    'project_circle-noise/circle-noise.html',
    'project_form-input/display.html',
    'project_form-input/form-input.html',
    'project_lap-timer/timer.html',
    'project_noise-experiment/noise-experiment.html',
    'project_race-tracking/race.html',
    'project_web-xr/a-frame-2.html',
    'project_web-xr/a-frame.html',
    'project_web-xr/webxr.html',
    'what3pubs/index.html',
    ...[
      '2-5D', '5.4-functions&objects', 'aero-dynamic', 'cci-computing-exam-1', 'cci-g4-sound',
      'cci-week-2', 'cci-week-3', 'cci-week-4', 'cci-week-4b', 'cci-week-5-custom', 'cci-week-5-p5js',
      'cci-week-5', 'cci-week-6-gui', 'cci-week-6-inputs', 'cci-week-7-api', 'cci-week-7-pcomp',
      'cci-week-7-volcano', 'cci-week-8-api2', 'cci-wk10-mock', 'coffee-recipes', 'custom-cursor',
      'cycling-cafe', 'data-currency', 'dynamic-prototype-2', 'generative-isotype', 'not(!)-a-poem',
      'project-WOOP', 'regression', 'slate3d_model', 'type-size',
    ].map((name) => `projects/${name}.html`),
  ].map((path) => [path, EXPERIMENTS])),
};
