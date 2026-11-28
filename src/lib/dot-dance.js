// Dances for the dot-matrix lettering: the footer's "ashley" (the DotDance
// easter egg) and the design system page's playground. Each dance moves
// every dot with the Web Animations API.

// Letter boundaries in the footer wordmark's font units ("a s h l e y"), so
// dances can move whole letters together. Other lettering passes its own.
const WORDMARK_LETTER_EDGES = [600, 1200, 1800, 2200, 2800];
const random = (min, max) => min + Math.random() * (max - min);

// Each dance returns the keyframes and timing for one dot. Lengths are in
// the SVG's units: dots sit 100 units apart.
const DANCES = {
  // A ripple running left to right, twice.
  wave: ({ x }) => ({
    keyframes: [
      { transform: 'translate(0, 0)' },
      { transform: 'translate(0, -140px)' },
      { transform: 'translate(0, 0)' },
    ],
    options: { duration: 620, delay: x * 0.35, iterations: 2, easing: 'ease-in-out' },
  }),

  // The letters jump one after another, landing with a bounce.
  hop: ({ letter }) => ({
    keyframes: [
      { transform: 'translate(0, 0)', easing: 'cubic-bezier(.2, .7, .3, 1)' },
      { transform: 'translate(0, -260px)', offset: 0.4, easing: 'cubic-bezier(.6, 0, .9, .6)' },
      { transform: 'translate(0, 0)', offset: 0.75 },
      { transform: 'translate(0, -40px)', offset: 0.87 },
      { transform: 'translate(0, 0)' },
    ],
    options: { duration: 900, delay: letter * 120 },
  }),

  // Dots drop out of the bottom one by one and fall back in from above.
  rain: () => ({
    keyframes: [
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: 'translate(0, 600px)', opacity: 0, offset: 0.45 },
      { transform: 'translate(0, -600px)', opacity: 0, offset: 0.55 },
      { transform: 'translate(0, 0)', opacity: 1 },
    ],
    options: { duration: 1300, delay: random(0, 700), easing: 'ease-in-out' },
  }),

  // Random dots flash the site's orange (the --orange variable, so it follows
  // any change to it). Each flash is solid orange from start to end, with no
  // fade, so every lit dot is exactly the same colour. Also the stand-in
  // when motion is reduced.
  sparkle: () => ({
    keyframes: [{ fill: 'var(--orange)' }, { fill: 'var(--orange)' }],
    options: { duration: 450, delay: random(0, 1400), iterations: 1 },
  }),
};

// The dances by name, in the order the design system page lists them.
export const DANCE_NAMES = Object.keys(DANCES);

let lastDance = null;

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function pickDance() {
  if (reducedMotion()) return 'sparkle';
  const names = DANCE_NAMES.filter((name) => name !== lastDance);
  return names[Math.floor(Math.random() * names.length)];
}

// Makes every dot matching `selector` inside `root` dance: the dance named
// by `name`, or a random one (never the same twice in a row). With reduced
// motion it's always sparkle, which only changes colour. Returns the
// dance's name, or null if there was nothing to animate.
export function dance(root, { selector = '.dot-wordmark__dot', letterEdges = WORDMARK_LETTER_EDGES, name: chosen } = {}) {
  const dots = [...root.querySelectorAll(selector)];
  if (dots.length === 0 || typeof dots[0].animate !== 'function') return null;

  const name = reducedMotion() ? 'sparkle' : (chosen ?? pickDance());
  lastDance = name;

  dots.forEach((dot) => {
    dot.getAnimations?.().forEach((animation) => animation.cancel());
    // Scale each dot around its own centre.
    dot.style.transformBox = 'fill-box';
    dot.style.transformOrigin = 'center';
    const x = Number(dot.getAttribute('cx'));
    const { keyframes, options } = DANCES[name]({
      x,
      y: Number(dot.getAttribute('cy')),
      letter: letterEdges.filter((edge) => x > edge).length,
    });
    dot.animate(keyframes, options);
  });
  return name;
}
