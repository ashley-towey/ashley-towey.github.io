import { useRef } from 'react';
import CopyTip from './CopyTip';
import CopyToken from './CopyToken';
import { toHex, useLiveReading } from './hooks';

// One colour token. The chip is filled with the token itself, and its value
// is read back from the chip, so it shows what the browser is really
// drawing, counting through the change while the theme morphs. Clicking
// the chip or COPY copies var(--token).
export default function Swatch({ colour, theme, copied, onCopy }) {
  const chip = useRef(null);
  const live = useLiveReading(() => toHex(getComputedStyle(chip.current).backgroundColor), theme);
  const fallback = colour.mix ?? colour.light;
  const text = `var(${colour.token})`;

  return (
    <li className="ds-swatch">
      {/* The chip is a mouse shortcut for the token's copy button below, so
          it's left out of the tab order. Its tooltip (the home heading's)
          sits centred above it. */}
      <span
        ref={chip}
        className="ds-swatch__chip"
        style={{ backgroundColor: `var(${colour.token})` }}
        onClick={() => onCopy(text)}
        aria-hidden="true"
      >
        <CopyTip copied={copied === text} />
      </span>
      <div className="ds-swatch__meta">
        <span className="caption-1">{colour.name}</span>
        <span className="ds-swatch__value caption-2">{live ?? fallback}</span>
      </div>
      <CopyToken label={colour.token} text={text} copied={copied} onCopy={onCopy} />
      <p className="ds-swatch__role type-body">{colour.role}</p>
      <dl className="ds-swatch__themes caption-2">
        {colour.mix ? (
          <div><dt>Mix</dt><dd>{colour.mix}</dd></div>
        ) : (
          <>
            <div><dt>Light</dt><dd>{toHex(colour.light) ?? colour.light}</dd></div>
            <div><dt>Dark</dt><dd>{toHex(colour.dark) ?? colour.dark}</dd></div>
          </>
        )}
      </dl>
    </li>
  );
}
