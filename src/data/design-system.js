// What the /design-system/ page shows. The page reads the live values from
// the site's CSS; the light/dark hex values here are what it shows before
// that (prerendered HTML) and are checked against tokens.css by the tests.

// DRAFT copy — to review
export const intro = {
  lead: 'The system',
  heading: 'behind this site.',
  body: 'Every colour, type style and component on this page is the real thing, read live from the same CSS and React components that build the rest of the site. Switch the theme and watch it change.',
};

// Colour tokens, in the order they're shown. `mix` marks a token that's
// mixed from others in CSS rather than set per theme.
export const colours = [
  { token: '--paper', name: 'Paper', light: '#CFCBC0', dark: '#302F2B', role: 'The page itself. Warm, like uncoated stock.' },
  { token: '--surface', name: 'Surface', light: '#D6D9DD', dark: '#3B3933', role: 'Raised panels that sit on the paper.' },
  { token: '--ink', name: 'Ink', light: '#101112', dark: '#F0EEE8', role: 'Text, rules and the primary button.' },
  { token: '--ink-soft', name: 'Ink soft', mix: 'ink 45% + paper', role: 'Resting and inactive text, such as the experiments list.' },
  { token: '--muted', name: 'Muted', light: '#53565B', dark: '#B9B6AE', role: 'Labels, captions and secondary text.' },
  { token: '--line-strong', name: 'Line', light: 'rgba(35, 39, 43, .48)', dark: 'rgba(235, 232, 222, .42)', role: 'Frame rules and registration marks.' },
  { token: '--orange', name: 'Orange', light: '#ED5A08', dark: '#FF7830', role: 'The one accent: focus, selection, highlights.' },
  { token: '--field-active', name: 'Field active', light: '#DBD8CF', dark: '#3B3A35', role: 'A form field while it’s being typed in.' },
];

// Type styles. Each one is shown rendered with its own class.
export const typeStyles = [
  { className: 'type-h1', name: 'Heading 1', sample: 'I design & build', usage: 'One per page: the page heading.' },
  { className: 'type-h2', name: 'Heading 2', sample: 'Selected work', usage: 'Leads and section headings.' },
  { className: 'type-h3', name: 'Heading 3', sample: 'Encord Data Labs', usage: 'Project titles and pull quotes.' },
  { className: 'type-body', name: 'Body', sample: 'My work blends creative computing with graphic design.', usage: 'Paragraphs and summaries.' },
  { className: 'caption-1', name: 'Caption 1', sample: 'Skip to content', usage: 'Emphasised labels.' },
  { className: 'caption-2', name: 'Caption 2', sample: 'All projects', usage: 'Labels, buttons and registration lines.' },
  { className: 'type-numerical-lg', name: 'Numerical', sample: '2026', usage: 'Years and counts, in Domestique.' },
];

// Spacing and shape tokens, drawn as bars (or a corner) at their real size.
export const spacing = [
  { token: '--section-inset', name: 'Section inset', role: 'Padding inside every frame.' },
  { token: '--grid-gap', name: 'Grid gap', role: 'Between grid columns. Grows with the viewport.' },
  { token: '--registration-mark-size', name: 'Mark size', role: 'Each “+” registration mark.' },
  { token: '--registration-mark-clearance', name: 'Mark clearance', role: 'Space between a mark and the rule it ends.' },
  { token: '--radius-media', name: 'Media radius', role: 'Corners of every image and video.', corner: true },
];

// The dot matrix playground.
// DRAFT copy — to review
export const dots = {
  intro: 'Small moments of joy, like the footer’s dancing dots, reward anyone who stops to play. Click a few dots to light them, then pick a dance.',
};

// The one easing curve, shared by the theme change and the primary button.
export const easing = { value: 'cubic-bezier(.65, 0, .35, 1)', points: [0.65, 0, 0.35, 1] };
