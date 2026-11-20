import { Link } from 'react-router-dom';
import { imageUrl, projectPath } from '../lib/paths';

export default function ProjectCard({ project, index }) {
  return (
    <Link className="project-card" to={projectPath(project.slug)}>
      <div className="project-card__image">
        <img src={imageUrl(project.cover)} alt={project.alt} loading={index < 3 ? 'eager' : 'lazy'} />
        <div className="project-card__caption">
          <h3>{project.title}</h3>
          <p className="type-body">{project.description}</p>
          <span className="project-card__open caption-2">View project</span>
        </div>
      </div>
    </Link>
  );
}
