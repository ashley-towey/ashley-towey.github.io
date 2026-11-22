import { Link, useParams } from 'react-router-dom';
import ButtonLink, { BracketBox } from '../components/ButtonLink';
import Page from '../components/Page';
import ProjectBlocks from '../components/ProjectBlocks';
import Picture from '../components/Picture';
import RegistrationLine from '../components/RegistrationLine';
import { getProject, projectHero, projects } from '../data/projects';
import { projectPath } from '../lib/paths';
import NotFound from './NotFound';
import './Project.css';

// A portfolio project at /work/<slug>/.
export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound eyebrow="Project not found" />;

  const index = projects.indexOf(project);
  const previous = projects.at(index - 1);
  const next = projects[(index + 1) % projects.length];
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
      <RegistrationLine as="h2"><Link className="project-nav__all" to="/">All projects</Link></RegistrationLine>
      {/* Side rules only: the footer's top rule closes it. */}
      <nav className="project-nav frame-sides" aria-label="More projects">
        <ProjectNavLink project={previous} direction="previous" />
        <ProjectNavLink project={next} direction="next" />
      </nav>
    </Page>
  );
}

// One half of the previous / next links: title and direction.
// Hovering shows a small cover, like the headline tooltips.
function ProjectNavLink({ project, direction }) {
  const label = direction === 'next' ? 'Next' : 'Previous';
  return (
    <Link className={`project-nav__link project-nav__link--${direction}`} to={projectPath(project)} aria-label={`${label} project: ${project.title}`}>
      <span className="project-nav__title">{project.title}</span>
      {/* Styled as a secondary (bracket) button; the whole half is the link. */}
      <span className="project-nav__direction bracket-button caption-2">{label}<BracketBox /></span>
      <span className="project-nav__thumb" aria-hidden="true">
        <Picture src={project.cover} alt="" loading="lazy" sizes="180px" />
      </span>
    </Link>
  );
}
