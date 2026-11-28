import { useRef } from 'react';
import CopyToken from './CopyToken';
import { useLiveReading, useScrollFade } from './hooks';

// Each type style rendered with its own class, with the size, weight and
// family the browser resolved for it. The headings use clamp(), so their
// sizes change as the window is resized. COPY copies the class name.
export default function TypeScale({ styles, theme, copied, onCopy }) {
  return (
    <ol className="ds-type-scale">
      {styles.map((style) => (
        <TypeRow key={style.className} style={style} theme={theme} copied={copied} onCopy={onCopy} />
      ))}
    </ol>
  );
}

function TypeRow({ style, theme, copied, onCopy }) {
  const sample = useRef(null);
  const live = useLiveReading(() => {
    const css = getComputedStyle(sample.current);
    return {
      size: `${Math.round(parseFloat(css.fontSize))}px`,
      weight: css.fontWeight,
      family: css.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
    };
  }, theme);
  const scroller = useScrollFade(sample);

  return (
    <li className="ds-type-row">
      <div className="ds-type-row__spec">
        <span className="caption-1">{style.name}</span>
        <CopyToken label={`.${style.className}`} text={style.className} copied={copied} onCopy={onCopy} />
        <dl className="ds-type-row__values caption-2">
          <div><dt>Size</dt><dd>{live?.size ?? '—'}</dd></div>
          <div><dt>Weight</dt><dd>{live?.weight ?? '—'}</dd></div>
          <div><dt>Family</dt><dd>{live?.family ?? '—'}</dd></div>
        </dl>
        <p className="ds-type-row__usage type-body">{style.usage}</p>
      </div>
      {/* A one-line field in the style itself, so you can try your own
          words. Past the edge, the text slides under a soft fade (the
          field scrolls), so the row never changes height. */}
      <input
        ref={sample}
        className={`ds-type-row__sample ${style.className}`}
        defaultValue={style.sample}
        placeholder={style.sample}
        spellCheck={false}
        autoComplete="off"
        aria-label={`Try ${style.name}`}
        {...scroller}
      />
    </li>
  );
}
