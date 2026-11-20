import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';
import RegistrationLine from '../components/RegistrationLine';
import { getProject, projects } from '../data/projects';
import Picture from '../components/Picture';
import { projectPath } from '../lib/paths';
import NotFound from './NotFound';
import './Project.css';

const pad = (n) => String(n).padStart(2, '0');

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound eyebrow="Project not found" />;

  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <Page className="project-page">
      <section className="project-intro frame-sides">
        <div className="project-intro__title">
          <p className="eyebrow caption-2">Project {pad(index + 1)} / {pad(projects.length)}</p>
          <h1>{project.title}</h1>
          <div className="client-block"><span className="eyebrow caption-2">Client</span><h2>{project.client}</h2></div>
        </div>
        <p className="type-body">{project.description}</p>
        <div className="project-intro__meta">
          <span className="eyebrow caption-2">Disciplines</span>
          <ul>{project.disciplines.map((discipline) => <li className="caption-2" key={discipline}>{discipline}</li>)}</ul>
          {project.year && <span className="project-year caption-2">{project.year}</span>}
        </div>
      </section>
      <RegistrationLine>Project imagery</RegistrationLine>
      <section className="project-gallery frame-box" aria-label={`${project.title} project images`}>
        {[project.cover, ...project.gallery].map((image, i) => (
          <figure className={i === 0 ? 'gallery-image gallery-image--hero' : 'gallery-image'} key={image}>
            <Picture src={image} alt={`${project.title} project view ${i + 1}`} loading={i < 2 ? 'eager' : 'lazy'} sizes="(max-width: 500px) 92vw, 46vw" />
          </figure>
        ))}
      </section>
      <section className="next-project frame-sides">
        <span className="eyebrow caption-2">Next project</span>
        <h2 className="next-project__title">
          <Link to={projectPath(nextProject.slug)}>{nextProject.title}</Link>
        </h2>
        <ButtonLink variant="secondary" to="/">All projects</ButtonLink>
      </section>
    </Page>
  );
}
