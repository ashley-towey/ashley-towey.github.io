import ButtonLink from '../components/ButtonLink';
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
      <section className="project-grid frame-box" aria-label="Experiments">
        {projectsIn('experiments').map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
      <section className="home-closer frame-sides">
        <p className="eyebrow caption-2">Looking for client work?</p>
        <h2>See the<br />selected projects.</h2>
        <ButtonLink variant="secondary" to="/">All projects</ButtonLink>
      </section>
    </Page>
  );
}
