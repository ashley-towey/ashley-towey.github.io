import { useEffect, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectPath } from '../lib/paths';

// One word in the home heading ("websites,") with a superscript count. When
// it has projects, clicking it opens a small popover listing them as links.
// The parent owns which word is open, so only one popover shows at a time.
export default function CategoryWord({ label, projects, open, onToggle, onClose }) {
  const ref = useRef(null);
  const popoverId = useId();
  const count = <sup className="category-word__count type-numerical">[{projects.length}]</sup>;

  useEffect(() => {
    if (!open) return undefined;
    ref.current.querySelector('.category-word__popover a')?.focus();

    const onPointerDown = (event) => {
      if (!ref.current.contains(event.target)) onClose();
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      onClose();
      ref.current.querySelector('button')?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (projects.length === 0) {
    return <span className="category-word">{label}{count}</span>;
  }

  return (
    <span className="category-word" ref={ref} data-open={open || undefined}>
      <button type="button" className="category-word__button" aria-expanded={open} aria-controls={open ? popoverId : undefined} onClick={onToggle}>
        {label}{count}
      </button>
      {/* Rendered only while open, so the heading's text stays the sentence.
          Spans with list roles: a heading may only hold phrasing content. */}
      {open && (
        <span className="category-word__popover" id={popoverId} role="list">
          {projects.map((project) => (
            <span role="listitem" key={project.slug}>
              <Link to={projectPath(project)}>{project.title}</Link>
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
