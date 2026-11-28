// The site's column grid drawn over the whole window: the same width as
// .site-shell, inset by --section-inset, with --grid-gap between columns
// (3 on desktop, 2 then 1 on smaller screens, as on the home page).
export default function GridOverlay() {
  return (
    <div className="ds-grid-overlay" aria-hidden="true">
      <div className="ds-grid-overlay__shell">
        <span /><span /><span />
      </div>
    </div>
  );
}
