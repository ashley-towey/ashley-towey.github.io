import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ButtonLink, { BracketBox } from '../components/ButtonLink';
import ExperimentModal from '../components/ExperimentModal';
import Page from '../components/Page';
import ProjectBlocks from '../components/ProjectBlocks';
import Picture from '../components/Picture';
import { EXPERIMENTS } from '../data/experiments';
import { getProject, projectHero, projectsIn } from '../data/projects';
import { projectPath, sectionPath } from '../lib/paths';
import NotFound from './NotFound';
import './Project.css';

const LABELS = {
  work: { item: 'Project', next: 'Next project', all: 'All projects' },
  experiments: { item: 'Experiment', next: 'Next experiment', all: 'All experiments' },
};

export default function Project({ section = 'work' }) {
  const { slug } = useParams();
  const [trying, setTrying] = useState(false);
  const closeModal = useCallback(() => setTrying(false), []);
  const project = getProject(slug, section);
  const labels = LABELS[section];
  if (!project) return <NotFound eyebrow={`${labels.item} not found`} />;

  const list = projectsIn(section);
  const index = list.indexOf(project);
  const nextProject = list[(index + 1) % list.length];
  const hero = projectHero(project);
  // A live code experiment (set as `tryIt` in data/experiments.js) can be tried in a modal.
  const tryIt = EXPERIMENTS.find((entry) => entry.project === project.slug)?.tryIt;

  return (
    <Page className="project-page">
      <section className="project-intro frame-sides">
        <div className="project-intro__text">
          {project.year && <span className="project-intro__year type-numerical-lg">{project.year}</span>}
          <h1 className="type-h1">{project.title}</h1>
          <div className="project-intro__description type-body">
            {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {project.credits && (
              <p className="project-credits"><span className="eyebrow caption-2">In collaboration with</span>{project.credits}</p>
            )}
            {(project.links?.length > 0 || tryIt) && (
              <div className="project-links">
                {tryIt && (
                  <button type="button" className="bracket-button caption-2" onClick={() => setTrying(true)} aria-label={`Try ${project.title}`}>
                    Try it<BracketBox />
                  </button>
                )}
                {project.links?.map((link) => (
                  <ButtonLink key={link.href} variant="secondary" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</ButtonLink>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="project-intro__hero">
          <Picture src={hero.src} alt={hero.alt} loading="eager" sizes="(max-width: 780px) 92vw, 60vw" />
        </div>
      </section>
      <ProjectBlocks project={project} />
      <section className="next-project frame-sides">
        <span className="eyebrow caption-2">{labels.next}</span>
        <h2 className="next-project__title">
          <Link to={projectPath(nextProject)}>{nextProject.title}</Link>
        </h2>
        <ButtonLink variant="secondary" to={sectionPath(section)}>{labels.all}</ButtonLink>
      </section>
      {trying && <ExperimentModal title={project.title} src={tryIt} onClose={closeModal} />}
    </Page>
  );
}
