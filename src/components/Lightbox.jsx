import { useEffect, useRef } from 'react';
import { BracketBox } from './ButtonLink';
import Picture from './Picture';
import './Lightbox.css';

// Shows one image of a gallery in a pop-up over the page, like the
// experiment pop-up. Escape, the close button or a
// click on the backdrop closes it; the arrow keys and the previous / next
// buttons move through the gallery, wrapping round. Focus moves to the close
// button while open and back to the image that opened it afterwards.
export default function Lightbox({ images, index, onChange, onClose }) {
  const closeButton = useRef(null);
  const image = images[index];
  const count = images.length;
  const go = (step) => onChange((index + step + count) % count);

  useEffect(() => {
    const opener = document.activeElement;
    closeButton.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (count > 1 && event.key === 'ArrowRight') onChange((index + 1) % count);
      if (count > 1 && event.key === 'ArrowLeft') onChange((index - 1 + count) % count);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [index, count, onChange, onClose]);

  return (
    <div className="lightbox" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="lightbox__box" role="dialog" aria-modal="true" aria-label={image.alt}>
      <div className="lightbox__bar">
        <span className="caption-2">{index + 1} / {count}</span>
        <div className="lightbox__controls">
          {count > 1 && (
            <>
              <button type="button" className="bracket-button caption-2" onClick={() => go(-1)}>Previous<BracketBox /></button>
              <button type="button" className="bracket-button caption-2" onClick={() => go(1)}>Next<BracketBox /></button>
            </>
          )}
          <button ref={closeButton} type="button" className="bracket-button caption-2" onClick={onClose}>Close<BracketBox /></button>
        </div>
      </div>
      <figure className="lightbox__figure">
        <Picture key={image.src} src={image.src} alt={image.alt} loading="eager" sizes="(max-width: 780px) 100vw, 80vw" />
        {image.caption && <figcaption className="caption-2">{image.caption}</figcaption>}
      </figure>
      </div>
    </div>
  );
}
