import { useEffect, useRef } from 'react';
import ButtonLink from '../ButtonLink';

// Slowed down so the shape is easy to see; on the site it runs in .3–.38s.
const DEMO_MS = 1400;

// The site's one easing curve, drawn as a graph (time across, progress up).
// A dot traces it: it moves across at a steady rate and up with the easing.
// Below, two markers race: one linear, one eased.
export default function EasingCurve({ easing }) {
  const root = useRef(null);
  const [x1, y1, x2, y2] = easing.points;

  function play() {
    const element = root.current;
    if (!element || typeof element.animate !== 'function') return;
    const timing = { duration: DEMO_MS, fill: 'both' };
    element.querySelector('.ds-easing__tracer-x').animate([{ left: '0%' }, { left: '100%' }], { ...timing, easing: 'linear' });
    element.querySelector('.ds-easing__tracer-y').animate([{ bottom: '0%' }, { bottom: '100%' }], { ...timing, easing: easing.value });
    element.querySelector('.ds-easing__marker--linear').animate([{ left: '0%' }, { left: '100%' }], { ...timing, easing: 'linear' });
    element.querySelector('.ds-easing__marker--eased').animate([{ left: '0%' }, { left: '100%' }], { ...timing, easing: easing.value });
  }

  // Play once when it first scrolls into view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        play();
        observer.disconnect();
      }
    }, { threshold: 0.6 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ds-easing" ref={root}>
      <div className="ds-easing__graph">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <line className="ds-easing__guide" x1="0" y1="100" x2={x1 * 100} y2={100 - y1 * 100} />
          <line className="ds-easing__guide" x1="100" y1="0" x2={x2 * 100} y2={100 - y2 * 100} />
          <path className="ds-easing__curve" d={`M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`} />
        </svg>
        <span className="ds-easing__handle" style={{ left: `${x1 * 100}%`, bottom: `${y1 * 100}%` }} aria-hidden="true" />
        <span className="ds-easing__handle" style={{ left: `${x2 * 100}%`, bottom: `${y2 * 100}%` }} aria-hidden="true" />
        <span className="ds-easing__tracer-x" aria-hidden="true">
          <span className="ds-easing__tracer-y" />
        </span>
        <span className="ds-easing__axis ds-easing__axis--x caption-2">Time</span>
        <span className="ds-easing__axis ds-easing__axis--y caption-2">Progress</span>
      </div>
      <div className="ds-easing__side">
        <code className="ds-token type-numerical-lg">{easing.value}</code>
        <p className="type-body">Slow out, fast through the middle, slow in. The curve behind the site’s bigger moves: the theme change and the sliding pill button. Shown here at 4× slower.</p>
        <div className="ds-easing__race" aria-hidden="true">
          <div className="ds-easing__lane"><span className="caption-2">Linear</span><span className="ds-easing__track"><span className="ds-easing__marker ds-easing__marker--linear" /></span></div>
          <div className="ds-easing__lane"><span className="caption-2">Site ease</span><span className="ds-easing__track"><span className="ds-easing__marker ds-easing__marker--eased" /></span></div>
        </div>
        <ButtonLink as="button" type="button" first="Re" second="play" onClick={play} />
      </div>
    </div>
  );
}
