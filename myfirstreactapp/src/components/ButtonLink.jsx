import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ButtonLink.css';

// useLayoutEffect warns during server prerendering; it only matters in the browser.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// `to` renders an internal router link; `href` renders a plain anchor.
export default function ButtonLink({ variant = 'primary', first, second, className = '', children, to, ...rest }) {
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
    const observer = new ResizeObserver(updateWidths);
    link.querySelectorAll('[data-segment]').forEach((segment) => observer.observe(segment));
    return () => observer.disconnect();
  }, [first, second, variant]);

  const Anchor = to ? Link : 'a';
  const linkProps = to ? { to, ...rest } : rest;
  const classes = `button-link button-link--${variant} caption-1 ${className}`.trim();

  if (variant === 'secondary') {
    return <Anchor className={classes} {...linkProps}>{children}</Anchor>;
  }

  return (
    <Anchor ref={ref} className={classes} aria-label={`${first} ${second}`} {...linkProps}>
      <span className="button-link__slider" aria-hidden="true" />
      <span className="button-link__segment button-link__segment--first" data-segment data-label={first}>{first}</span>
      <span className="button-link__segment button-link__segment--last" data-segment data-label={second}>{second}</span>
    </Anchor>
  );
}
