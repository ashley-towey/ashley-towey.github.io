import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './ButtonLink.css';

// useLayoutEffect warns during server prerendering; it only matters in the browser.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// `to` renders an internal router link; `href` renders a plain anchor;
// as="button" renders a real <button> (e.g. a form's submit).
// variant="primary" is the two-part sliding pill (first/second labels);
// variant="secondary" is the bracket button: LABEL [ ● ], dot on hover/active.
export default function ButtonLink({ variant = 'primary', first, second, className = '', children, to, as, active = false, ...rest }) {
  const ref = useRef(null);

  useBrowserLayoutEffect(() => {
    if (variant !== 'primary') return undefined;
    const link = ref.current;
    const updateWidths = () => {
      const [start, end] = link.querySelectorAll('[data-segment]');
      link.style.setProperty('--segment-start', `${start.offsetWidth}px`);
      link.style.setProperty('--segment-end', `${end.offsetWidth}px`);
    };

    updateWidths();
    // Enable the slide animation only after the first measurement, so the
    // prerendered pill doesn't animate from its fallback width on load.
    const frame = requestAnimationFrame(() => link.setAttribute('data-ready', ''));
    const observer = new ResizeObserver(updateWidths);
    link.querySelectorAll('[data-segment]').forEach((segment) => observer.observe(segment));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [first, second, variant]);

  const Anchor = as ?? (to ? Link : 'a');
  const linkProps = to ? { to, ...rest } : rest;
  if (variant === 'secondary') {
    // NavLink marks the current page with aria-current, which fills the dot.
    const Bracket = to ? NavLink : 'a';
    return (
      <Bracket end={to ? true : undefined} className={`bracket-button caption-2 ${className}`.trim()} data-active={active || undefined} {...linkProps}>
        {children}<BracketBox />
      </Bracket>
    );
  }

  const classes = `button-link button-link--primary ${className}`.trim();

  return (
    <Anchor ref={ref} className={classes} aria-label={`${first} ${second}`} {...linkProps}>
      <span className="button-link__slider" aria-hidden="true" />
      <span className="button-link__segment button-link__segment--first" data-segment data-label={first}>{first}</span>
      <span className="button-link__segment button-link__segment--last" data-segment data-label={second}>{second}</span>
    </Anchor>
  );
}

// The "[ ● ]" after a bracket button's label. The dot always takes up space,
// so the label never shifts; CSS only changes its colour.
export function BracketBox() {
  return (
    <span className="bracket-button__box" aria-hidden="true">
      [<span className="bracket-button__dot" />]
    </span>
  );
}

// A bracket button that toggles something on the page (e.g. GRID / LIST).
export function ToggleButton({ pressed, className = '', children, ...rest }) {
  return (
    <button type="button" className={`bracket-button caption-2 ${className}`.trim()} aria-pressed={pressed} {...rest}>
      {children}<BracketBox />
    </button>
  );
}
