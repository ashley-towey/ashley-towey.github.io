import { useEffect, useRef, useState } from 'react';
import { BracketBox } from '../ButtonLink';
import { DANCE_NAMES, dance } from '../../lib/dot-dance';
import { dots as copy } from '../../data/design-system';

// Domestique draws every glyph from round dots on a grid, 100 font units
// apart (1000 units per em), like the footer's "ashley". To turn any word
// into clickable dots, the word is drawn in Domestique on a hidden canvas and
// the centre of each grid cell is checked for ink.
const UNITS_PER_EM = 1000;
const GRID = 100;
const DOT_RADIUS = 40;
const SCALE = 0.2; // canvas px per font unit: 200px type, a 20px grid
const ROWS_ABOVE = 9; // grid rows checked above the baseline (ascenders, accents)
const ROWS_BELOW = 3; // and below it (descenders)
const DOT_SELECTOR = '.ds-dots__dot';

function sampleDots(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  const font = `${UNITS_PER_EM * SCALE}px Domestique`;
  context.font = font;
  const advance = Math.ceil(context.measureText(text).width / SCALE / GRID) * GRID;
  const cell = GRID * SCALE;
  canvas.width = Math.max(1, Math.ceil((advance + GRID) * SCALE));
  canvas.height = Math.ceil((ROWS_ABOVE + ROWS_BELOW) * cell);
  const baseline = ROWS_ABOVE * cell;
  context.font = font; // resizing the canvas resets its state
  context.fillStyle = '#000';
  context.textBaseline = 'alphabetic';
  context.fillText(text, 0, baseline);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

  const dots = [];
  const letterEdges = [];
  // Letter boundaries, so dances can move whole letters together.
  for (let i = 1; i < text.length; i += 1) {
    letterEdges.push(Math.round(context.measureText(text.slice(0, i)).width / SCALE));
  }
  // Dot centres sit on the grid: x = 100, 200…; y = -50, -150… above the
  // baseline and 50, 150… below it.
  for (let x = GRID; x <= advance; x += GRID) {
    for (let row = -ROWS_ABOVE; row < ROWS_BELOW; row += 1) {
      const y = row * GRID + GRID / 2;
      const px = Math.round(x * SCALE);
      const py = Math.round(baseline + y * SCALE);
      if (px >= canvas.width || py < 0 || py >= canvas.height) continue;
      if (data[(py * canvas.width + px) * 4 + 3] > 128) dots.push([x, y]);
    }
  }
  return { dots, advance, letterEdges };
}

// The word the playground shows ("ashley" is already in the footer).
const WORD = 'hello';

// The word set in dots. Click a dot to light it orange (and again to turn
// it back), and pick a dance: the same dances as the footer's double-tap
// easter egg. The playing dance's button shows its dot until it finishes.
export default function DotPlayground() {
  const [result, setResult] = useState(null);
  const [lit, setLit] = useState(() => new Set());
  const [playing, setPlaying] = useState(null);
  const svg = useRef(null);
  const run = useRef(0);

  useEffect(() => {
    // Wait for Domestique before drawing, or the canvas would sample a
    // fallback font. (jsdom has no document.fonts; nothing is drawn there.)
    if (!document.fonts) return undefined;
    let cancelled = false;
    document.fonts.load(`${UNITS_PER_EM * SCALE}px Domestique`).then(() => {
      if (!cancelled) setResult(sampleDots(WORD));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function toggle(key) {
    setLit((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function play(name) {
    if (!result) return;
    const played = dance(svg.current, { selector: DOT_SELECTOR, letterEdges: result.letterEdges, name });
    if (!played) return;
    // Show this dance as playing until its dots finish (or another starts).
    const id = ++run.current;
    setPlaying(played);
    const animations = [...svg.current.querySelectorAll(DOT_SELECTOR)].flatMap((dot) => dot.getAnimations?.() ?? []);
    await Promise.allSettled(animations.map((animation) => animation.finished));
    if (run.current === id) setPlaying(null);
  }

  const dots = result?.dots ?? [];

  return (
    <div className="ds-dots">
      <div className="ds-dots__controls">
        <p className="ds-dots__intro type-body">{copy.intro}</p>
        <div className="ds-dots__buttons" role="group" aria-label="Dances">
          {DANCE_NAMES.map((name) => (
            <button key={name} type="button" className="bracket-button caption-2" data-active={playing === name || undefined} onClick={() => play(name)}>
              {name}<BracketBox />
            </button>
          ))}
          <button type="button" className="bracket-button caption-2" onClick={() => setLit(new Set())} disabled={lit.size === 0}>
            Clear orange<BracketBox />
          </button>
        </div>
      </div>
      <div className="ds-dots__stage">
        {dots.length > 0 && (
          <svg
            ref={svg}
            className="ds-dots__svg"
            viewBox={`0 ${Math.min(...dots.map(([, y]) => y)) - GRID / 2} ${result.advance + GRID} ${Math.max(...dots.map(([, y]) => y)) - Math.min(...dots.map(([, y]) => y)) + GRID}`}
            role="img"
            aria-label={`“${WORD}” drawn in dots`}
          >
            {dots.map(([cx, cy]) => {
              const key = `${cx},${cy}`;
              return (
                <circle
                  key={key}
                  className={lit.has(key) ? 'ds-dots__dot ds-dots__dot--lit' : 'ds-dots__dot'}
                  cx={cx}
                  cy={cy}
                  r={DOT_RADIUS}
                  onClick={() => toggle(key)}
                />
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
