// The home heading's tooltip (.headline-word__tip in Home.css), holding
// COPY and COPIED stacked in the same spot. CSS cross-fades between them,
// and the box is always sized for the longer word, so it doesn't jump in
// width when the word changes.
export default function CopyTip({ copied }) {
  return (
    <span className="headline-word__tip ds-copy-tip" aria-hidden="true">
      <span className="ds-copy-tip__words">
        <span className="ds-copy-tip__word" data-on={!copied || undefined}>Copy</span>
        <span className="ds-copy-tip__word" data-on={copied || undefined}>Copied</span>
      </span>
      <span className="headline-word__arrow" />
    </span>
  );
}
