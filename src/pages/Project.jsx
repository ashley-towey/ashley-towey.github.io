import { Link, useParams } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';
import ProjectBlocks from '../components/ProjectBlocks';
import Picture from '../components/Picture';
import { getProject, projectHero, projects } from '../data/projects';
import { projectPath } from '../lib/paths';
import NotFound from './NotFound';
import './Project.css';

// A portfolio project at /work/<slug>/.
export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound eyebrow="Project not found" />;

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const hero = projectHero(project);

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
            {project.links?.length > 0 && (
              <div className="project-links">
                {project.links.map((link) => (
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
        <span className="eyebrow caption-2">Next project</span>
        <h2 className="next-project__title">
          <Link to={projectPath(nextProject)}>{nextProject.title}</Link>
        </h2>
        <ButtonLink variant="secondary" to="/">All projects</ButtonLink>
      </section>
    </Page>
  );
}
