import { useEffect, useState } from 'react';
import CopyTip from './CopyTip';

// A token or class name you can click to copy. It uses the same tooltip as
// the home heading's numbers (.headline-word__tip in Home.css): COPY on
// hover or focus, then COPIED, which stays up for a moment after a click.
// The tooltip only stays up when the copy came from this token, not from
// another control copying the same text (e.g. a colour swatch).
export default function CopyToken({ label, text, copied, onCopy }) {
  const [clickedHere, setClickedHere] = useState(false);
  const isCopied = copied === text;
  const showCopied = isCopied && clickedHere;

  // Forget the click once COPIED is over, so a later copy from elsewhere
  // (e.g. its colour swatch) doesn't pop this tooltip up too.
  useEffect(() => {
    if (!isCopied) setClickedHere(false);
  }, [isCopied]);

  return (
    <button
      type="button"
      className="ds-copy caption-2"
      data-copied={showCopied || undefined}
      onClick={() => {
        setClickedHere(true);
        onCopy(text);
      }}
      aria-label={isCopied ? `Copied ${text}` : `Copy ${text}`}
    >
      <code className="ds-token">{label}</code>
      <CopyTip copied={isCopied} />
    </button>
  );
}
