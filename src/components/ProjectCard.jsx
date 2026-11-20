import { Link } from 'react-router-dom';
import { projectPath } from '../lib/paths';
import Picture from './Picture';

// A project in the home page's grid view. The image stays greyscale; on hover
// or focus an orange tint fades in with the year, title and summary.
export default function ProjectCard({ project, index }) {
  return (
    <Link className="project-card" to={projectPath(project)}>
      <div className="project-card__image media-tint">
        <Picture src={project.cover} alt={project.alt} loading={index < 3 ? 'eager' : 'lazy'} sizes="(max-width: 500px) 92vw, (max-width: 780px) 46vw, 30vw" />
        <div className="project-card__caption">
          {project.year && <span className="project-card__year type-numerical-lg">{project.year}</span>}
          <h3>{project.title}</h3>
          <p className="project-card__summary type-body line-clamp-2">{project.summary}</p>
        </div>
      </div>
    </Link>
  );
}
