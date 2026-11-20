import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';
import ProjectBlocks from '../components/ProjectBlocks';
import { getProject, projectsIn } from '../data/projects';
import { projectPath, sectionPath } from '../lib/paths';
import NotFound from './NotFound';
import './Project.css';

const pad = (n) => String(n).padStart(2, '0');

const LABELS = {
  work: { item: 'Project', next: 'Next project', all: 'All projects' },
  experiments: { item: 'Experiment', next: 'Next experiment', all: 'All experiments' },
};

export default function Project({ section = 'work' }) {
  const { slug } = useParams();
  const project = getProject(slug, section);
  const labels = LABELS[section];
  if (!project) return <NotFound eyebrow={`${labels.item} not found`} />;

  const list = projectsIn(section);
  const index = list.indexOf(project);
  const nextProject = list[(index + 1) % list.length];

  return (
    <Page className="project-page">
      <section className="project-intro frame-sides">
        <div className="project-intro__title">
          <p className="eyebrow caption-2">{labels.item} {pad(index + 1)} / {pad(list.length)}</p>
          <h1>{project.title}</h1>
          <div className="client-block"><span className="eyebrow caption-2">Client</span><h2>{project.client}</h2></div>
        </div>
        <div className="project-intro__description type-body">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {project.credits && (
            <p className="project-credits"><span className="eyebrow caption-2">In collaboration with</span>{project.credits}</p>
          )}
          {project.links?.length > 0 && (
            <div className="project-links">
              {project.links.map((link) => (
                <ButtonLink key={link.href} variant="secondary" href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</ButtonLink>
              ))}
            </div>
          )}
        </div>
        <div className="project-intro__meta">
          <span className="eyebrow caption-2">Disciplines</span>
          <ul>{project.disciplines.map((discipline) => <li className="caption-2" key={discipline}>{discipline}</li>)}</ul>
          {project.year && <span className="project-year caption-2">{project.year}</span>}
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
    </Page>
  );
}
