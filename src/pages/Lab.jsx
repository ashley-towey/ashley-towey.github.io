import Page from '../components/Page';
import Picture from '../components/Picture';
import RegistrationLine from '../components/RegistrationLine';
import { lab } from '../data/lab';
import { basename } from '../lib/paths';
import './Home.css';

// Demos are static folders in public/lab/, so they're plain links (full page
// loads), not router links.
export const labDemoUrl = (slug) => `${basename}/lab/${slug}/`;

export default function Lab({ entries = lab }) {
  return (
    <Page>
      <section className="home-intro frame-sides" aria-labelledby="lab-heading">
        <p className="eyebrow caption-2">Lab</p>
        <h1 id="lab-heading">Coding experiments, sketches and prototypes.</h1>
      </section>
      <RegistrationLine as="h2">All experiments</RegistrationLine>
      <section className="project-grid frame-box" aria-label="Experiments">
        {entries.map((entry, index) => (
          <a className="project-card" href={labDemoUrl(entry.slug)} key={entry.slug}>
            <div className="project-card__image">
              <Picture
                src={entry.thumbnail}
                alt={entry.alt}
                loading={index < 3 ? 'eager' : 'lazy'}
                sizes="(max-width: 500px) 92vw, (max-width: 780px) 46vw, 30vw"
              />
              <div className="project-card__caption">
                <h3>{entry.title}</h3>
                <p className="type-body">{entry.description}</p>
                <span className="project-card__open caption-2">Open experiment{entry.year ? ` · ${entry.year}` : ''}</span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </Page>
  );
}
