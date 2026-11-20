import { useEffect } from 'react';

// EASTER EGG: double-tap (or double-click) anywhere in the footer and the
// dots in the big "ashley" do a random dance.
//
// Self-contained on purpose. It renders nothing, finds the wordmark's dots
// in the page, and animates them with the Web Animations API, so the
// wordmark component knows nothing about it. To turn it off, remove
// <DotDance /> from Footer.jsx (or delete this folder).

const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_DISTANCE = 30; // px between the two taps
const DOT_SELECTOR = '.dot-wordmark__dot';

// Letter boundaries in the wordmark's font units ("a s h l e y"), so dances
// can move whole letters together.
const LETTER_EDGES = [600, 1200, 1800, 2200, 2800];
const letterOf = (x) => LETTER_EDGES.filter((edge) => x > edge).length;
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
  hop: ({ x }) => ({
    keyframes: [
      { transform: 'translate(0, 0)', easing: 'cubic-bezier(.2, .7, .3, 1)' },
      { transform: 'translate(0, -260px)', offset: 0.4, easing: 'cubic-bezier(.6, 0, .9, .6)' },
      { transform: 'translate(0, 0)', offset: 0.75 },
      { transform: 'translate(0, -40px)', offset: 0.87 },
      { transform: 'translate(0, 0)' },
    ],
    options: { duration: 900, delay: letterOf(x) * 120 },
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

let lastDance = null;

function pickDance() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'sparkle';
  const names = Object.keys(DANCES).filter((name) => name !== lastDance);
  return names[Math.floor(Math.random() * names.length)];
}

export function dance(root) {
  const dots = [...root.querySelectorAll(DOT_SELECTOR)];
  if (dots.length === 0 || typeof dots[0].animate !== 'function') return null;

  const name = pickDance();
  lastDance = name;
  // SVGs clip at their edges; let the dots fly up into the footer's space.
  // (The footer still crops them at the bottom of the page.)
  const svg = dots[0].ownerSVGElement;
  if (svg) svg.style.overflow = 'visible';

  dots.forEach((dot) => {
    dot.getAnimations?.().forEach((animation) => animation.cancel());
    // Scale each dot around its own centre.
    dot.style.transformBox = 'fill-box';
    dot.style.transformOrigin = 'center';
    const { keyframes, options } = DANCES[name]({
      x: Number(dot.getAttribute('cx')),
      y: Number(dot.getAttribute('cy')),
    });
    dot.animate(keyframes, options);
  });
  return name;
}

export default function DotDance({ target = '.site-footer' }) {
  useEffect(() => {
    const root = document.querySelector(target);
    if (!root) return undefined;

    // pointerup covers mouse double-clicks and touch double-taps alike
    // (mobile browsers don't reliably send dblclick).
    let lastTap = null;
    const onPointerUp = (event) => {
      const tap = { time: event.timeStamp, x: event.clientX, y: event.clientY };
      const isDouble = lastTap
        && tap.time - lastTap.time < DOUBLE_TAP_MS
        && Math.hypot(tap.x - lastTap.x, tap.y - lastTap.y) < DOUBLE_TAP_DISTANCE;
      if (isDouble) {
        lastTap = null;
        dance(root);
      } else {
        lastTap = tap;
      }
    };

    root.addEventListener('pointerup', onPointerUp);
    return () => root.removeEventListener('pointerup', onPointerUp);
  }, [target]);

  return null;
}
