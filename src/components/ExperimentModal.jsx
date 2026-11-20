import { useEffect, useRef } from 'react';
import { BracketBox } from './ButtonLink';
import './ExperimentModal.css';

// A modal with a live code experiment embedded in an iframe. Escape, the
// close button or a click on the backdrop closes it; focus moves to the close
// button while open and back to whatever opened it afterwards.
export default function ExperimentModal({ title, src, onClose }) {
  const closeButton = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    closeButton.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="experiment-modal" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="experiment-modal__box" role="dialog" aria-modal="true" aria-label={title}>
        <div className="experiment-modal__bar">
          <span className="caption-2">{title}</span>
          <button ref={closeButton} type="button" className="bracket-button caption-2" onClick={onClose}>
            Close<BracketBox />
          </button>
        </div>
        <iframe className="experiment-modal__frame" src={src} title={title} allow="fullscreen; autoplay; camera; microphone; accelerometer; gyroscope" />
      </div>
    </div>
  );
}
