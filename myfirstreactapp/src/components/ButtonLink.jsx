import { useLayoutEffect, useRef } from 'react';
import './ButtonLink.css';

export default function ButtonLink({ variant = 'primary', first, second, className = '', children, ...linkProps }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
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

  const classes = `button-link button-link--${variant} caption-1 ${className}`.trim();

  if (variant === 'secondary') {
    return <a className={classes} {...linkProps}>{children}</a>;
  }

  return (
    <a ref={ref} className={classes} aria-label={`${first} ${second}`} {...linkProps}>
      <span className="button-link__slider" aria-hidden="true" />
      <span className="button-link__segment button-link__segment--first" data-segment data-label={first}>{first}</span>
      <span className="button-link__segment button-link__segment--last" data-segment data-label={second}>{second}</span>
    </a>
  );
}
