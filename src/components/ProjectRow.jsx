import { Link } from 'react-router-dom';
import { projectPath } from '../lib/paths';
import Picture from './Picture';

// A project in the home page's list view: thumbnail, title, summary, year.
export default function ProjectRow({ project, index }) {
  return (
    <Link className="project-row" to={projectPath(project)}>
      <div className="project-row__image media-tint">
        <Picture src={project.cover} alt="" loading={index < 4 ? 'eager' : 'lazy'} sizes="200px" />
      </div>
      <div className="project-row__text">
        <h3>{project.title}</h3>
        <p className="type-body line-clamp-2">{project.summary}</p>
      </div>
      {project.year && <span className="project-row__year type-numerical-lg">{project.year}</span>}
    </Link>
  );
}
