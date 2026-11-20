import { useState } from 'react';
import { WORDMARK_ADVANCE, WORDMARK_DOT_RADIUS, WORDMARK_DOTS } from '../data/footer-wordmark';

// The footer's big "ashley", drawn dot by dot so each dot can be clicked to
// turn it orange (and clicked again to turn it back). It's decorative, so it
// stays out of the accessibility tree and the tab order.
// The viewBox spans the word's full advance width, from the top of the
// ascender dots down to the crop line, which runs through the second-lowest
// row of the letters (as in the Figma mockup). Every dot of the word is
// drawn; the ones below the line hang out of the SVG and are cropped by the
// footer, so they're there for animations but not visible at rest.
const TOP = -700;
const CROP = -95;

export default function DotWordmark() {
  const [lit, setLit] = useState(() => new Set());

  function toggle(index) {
    setLit((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <svg className="dot-wordmark" viewBox={`0 ${TOP} ${WORDMARK_ADVANCE} ${CROP - TOP}`} aria-hidden="true" focusable="false">
      {WORDMARK_DOTS.map(([cx, cy], index) => (
        <circle
          key={`${cx},${cy}`}
          className={lit.has(index) ? 'dot-wordmark__dot dot-wordmark__dot--lit' : 'dot-wordmark__dot'}
          cx={cx}
          cy={cy}
          r={WORDMARK_DOT_RADIUS}
          onClick={() => toggle(index)}
        />
      ))}
    </svg>
  );
}
