import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import RegistrationLine from '../components/RegistrationLine';
import { projectsIn } from '../data/projects';
import './Home.css';

export default function Experiments() {
  return (
    <Page>
      <section className="home-intro frame-sides" aria-labelledby="experiments-heading">
        <p className="eyebrow caption-2">Experiments</p>
        <h1 id="experiments-heading">Prototypes, objects and self-initiated projects.</h1>
      </section>
      <RegistrationLine as="h2">All experiments</RegistrationLine>
      <section className="home-projects home-projects--grid frame-sides" aria-label="Experiments">
        {projectsIn('experiments').map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
    </Page>
  );
}
