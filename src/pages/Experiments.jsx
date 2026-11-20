import { useCallback, useMemo, useRef, useState } from 'react';
import { BracketBox } from '../components/ButtonLink';
import ExperimentModal from '../components/ExperimentModal';
import Page from '../components/Page';
import Picture, { imageRatio } from '../components/Picture';
import RegistrationLine from '../components/RegistrationLine';
import { experimentEntries } from '../data/experiments';
import './Home.css';
import './Experiments.css';

const IMAGES_ON_HOVER = 3;
const random = (min, max) => min + Math.random() * (max - min);

// Pick up to `count` images at random and place them in the panel: one per
// horizontal band, at a random size and position within it, so they never
// overlap and always fit.
function scatter(images, width, height, count = IMAGES_ON_HOVER) {
  const picked = [...images].sort(() => Math.random() - 0.5).slice(0, count);
  const band = height / picked.length;
  return picked.map((src, index) => {
    const ratio = imageRatio(src);
    let w = width * random(0.45, 0.8);
    let h = w / ratio;
    if (h > band * 0.94) {
      h = band * 0.94;
      w = h * ratio;
    }
    return { src, width: w, height: h, left: random(0, width - w), top: index * band + random(0, band - h) };
  });
}

export default function Experiments() {
  // Built once per visit, so the hovered entry keeps its identity between renders.
  const entries = useMemo(experimentEntries, []);
  const panel = useRef(null);
  const [active, setActive] = useState(null);
  const [placed, setPlaced] = useState([]);
  const [trying, setTrying] = useState(null);
  const closeModal = useCallback(() => setTrying(null), []);

  function show(entry) {
    if (entry === active) return;
    setActive(entry);
    const box = panel.current?.getBoundingClientRect();
    setPlaced(entry.images.length && box ? scatter(entry.images, box.width, box.height) : []);
  }

  function clear() {
    setActive(null);
    setPlaced([]);
  }

  return (
    <Page>
      <section className="home-intro home-intro--split frame-sides" aria-labelledby="experiments-heading">
        <h1 id="experiments-heading">
          <span className="home-intro__lead">Experiments;</span>{' '}
          some things, almost things, kinda a thing, not things, etc.
        </h1>
        <p className="home-intro__bio type-body">
          A collection of various objects and projects that I’ve worked on over the years which never fully formed into a project, but which are still fun to look at and served as the testing ground for future work.
        </p>
      </section>
      <RegistrationLine as="h2"><span className="visually-hidden">All experiments</span></RegistrationLine>
      <section className="experiments frame-sides" aria-label="Experiments" onMouseLeave={clear}>
        <ol className="experiments__list">
          {entries.map((entry) => {
            const label = (
              <>
                <span className="experiment-row__number">{entry.number}</span>
                <span className="experiment-row__title">{entry.title}</span>
              </>
            );
            return (
              <li
                key={entry.number}
                className="experiment-row"
                data-active={entry === active || undefined}
                onMouseEnter={() => show(entry)}
                onFocus={() => show(entry)}
              >
                {/* Rows don't link anywhere: visitors stay on this page, and only
                    TRY IT opens something (a code experiment, in a modal). */}
                <span className="experiment-row__main">{label}</span>
                {entry.tryIt && (
                  <button type="button" className="bracket-button caption-2" onClick={() => setTrying(entry)} aria-label={`Try ${entry.title}`}>
                    Try it<BracketBox />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
        <div className="experiments__panel" ref={panel} aria-hidden="true">
          {placed.map((image) => (
            <div
              key={`${active?.number}-${image.src}`}
              className="experiments__image"
              style={{ left: image.left, top: image.top, width: image.width, height: image.height }}
            >
              <Picture src={image.src} alt="" loading="eager" sizes="40vw" />
            </div>
          ))}
        </div>
        <span className="home-projects__end caption-2" aria-hidden="true">All projects</span>
      </section>
      {trying && <ExperimentModal title={trying.title} src={trying.tryIt} onClose={closeModal} />}
    </Page>
  );
}
