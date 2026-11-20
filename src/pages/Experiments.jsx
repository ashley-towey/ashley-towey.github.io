import { useCallback, useRef, useState } from 'react';
import { BracketBox } from '../components/ButtonLink';
import ExperimentModal from '../components/ExperimentModal';
import Page from '../components/Page';
import Picture, { imageRatio } from '../components/Picture';
import RegistrationLine from '../components/RegistrationLine';
import { EXPERIMENTS } from '../data/experiments';
import './Home.css';
import './Experiments.css';

// The /experiments/ page: a numbered list of everything in data/experiments.js.
// Clicking a row makes it active and scatters a few of its images on the
// right (they stay until another row is clicked); TRY IT opens a code
// experiment in a modal. Rows don't link anywhere.

const IMAGES_ON_HOVER = 3;
const random = (min, max) => min + Math.random() * (max - min);
const numberOf = (index) => String(index + 1).padStart(3, '0');

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
  const panel = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null); // the clicked row
  const [placed, setPlaced] = useState([]); // its scattered images
  const [trying, setTrying] = useState(null); // the experiment open in the modal
  const closeModal = useCallback(() => setTrying(null), []);

  // Clicking the active row again reshuffles its images.
  function activate(index) {
    setActiveIndex(index);
    const images = EXPERIMENTS[index].images ?? [];
    const box = panel.current?.getBoundingClientRect();
    setPlaced(images.length && box ? scatter(images, box.width, box.height) : []);
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
      <section className="experiments frame-sides" aria-label="Experiments">
        <ol className="experiments__list">
          {EXPERIMENTS.map((experiment, index) => (
            <li key={experiment.title} className="experiment-row">
              <button
                type="button"
                className="experiment-row__main"
                aria-pressed={index === activeIndex}
                onClick={() => activate(index)}
              >
                <span className="experiment-row__number">{numberOf(index)}</span>
                <span className="experiment-row__title">{experiment.title}</span>
              </button>
              {experiment.tryIt && (
                <button type="button" className="bracket-button caption-2" onClick={() => setTrying(experiment)} aria-label={`Try ${experiment.title}`}>
                  Try it<BracketBox />
                </button>
              )}
            </li>
          ))}
        </ol>
        <div className="experiments__panel" ref={panel} aria-hidden="true">
          {placed.map((image) => (
            <div
              key={`${activeIndex}-${image.src}`}
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
