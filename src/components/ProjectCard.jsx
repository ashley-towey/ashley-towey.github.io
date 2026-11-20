import { Link } from 'react-router-dom';
import { projectPath } from '../lib/paths';
import Picture from './Picture';

export default function ProjectCard({ project, index }) {
  return (
    <Link className="project-card" to={projectPath(project.slug)}>
      <div className="project-card__image">
        <Picture src={project.cover} alt={project.alt} loading={index < 3 ? 'eager' : 'lazy'} sizes="(max-width: 500px) 92vw, (max-width: 780px) 46vw, 30vw" />
        <div className="project-card__caption">
          <h3>{project.title}</h3>
          <p className="type-body">{project.summary}</p>
          <span className="project-card__open caption-2">View project</span>
        </div>
      </div>
    </Link>
  );
}
