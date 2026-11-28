import { useEffect, useRef, useState } from 'react';
import { ToggleButton } from '../ButtonLink';
import { useScrollFade } from './hooks';

const MIN_WEIGHT = 300;
const MAX_WEIGHT = 800;
const SWEEP_MS = 3200; // one full light → bold → light cycle

// Neue Regrade is a variable font (300–800), so weight is a smooth axis, not
// a few fixed cuts. Type anything, then drag the weight and size, or let
// SWEEP run the weight back and forth.
export default function TypeTester() {
  const [text, setText] = useState('Neue Regrade');
  const [weight, setWeight] = useState(500);
  const [size, setSize] = useState(120);
  const [sweeping, setSweeping] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frame = useRef();
  const field = useRef(null);
  // Past the edge, the text slides under a fade and glides back on blur,
  // like the type scale's samples. Size and weight change its width too.
  const scroller = useScrollFade(field, [size, weight]);

  useEffect(() => {
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  useEffect(() => {
    if (!sweeping) return undefined;
    const start = performance.now();
    const tick = (now) => {
      // A cosine wave, so it eases at each end instead of bouncing.
      const phase = ((now - start) % SWEEP_MS) / SWEEP_MS;
      setWeight(Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * (1 - Math.cos(phase * 2 * Math.PI)) / 2));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [sweeping]);

  return (
    <div className="ds-tester">
      <label className="ds-tester__label caption-2" htmlFor="ds-tester-text">Primary · Variable 300–800</label>
      <input
        id="ds-tester-text"
        ref={field}
        className="ds-tester__text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        spellCheck={false}
        autoComplete="off"
        style={{ fontWeight: weight, fontSize: `clamp(36px, ${size / 14}vw, ${size}px)` }}
        {...scroller}
      />
      <div className="ds-tester__controls">
        <label className="ds-slider">
          <span className="caption-2">Weight</span>
          <input
            type="range"
            min={MIN_WEIGHT}
            max={MAX_WEIGHT}
            value={weight}
            onChange={(event) => {
              setSweeping(false);
              setWeight(Number(event.target.value));
            }}
          />
          <output className="type-numerical-lg">{weight}</output>
        </label>
        <label className="ds-slider">
          <span className="caption-2">Size</span>
          <input type="range" min={36} max={200} value={size} onChange={(event) => setSize(Number(event.target.value))} />
          <output className="type-numerical-lg">{size}</output>
        </label>
        {!reducedMotion && (
          <ToggleButton pressed={sweeping} onClick={() => setSweeping((on) => !on)}>Sweep</ToggleButton>
        )}
      </div>
    </div>
  );
}
