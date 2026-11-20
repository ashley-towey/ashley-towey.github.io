import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import RegistrationLine from '../components/RegistrationLine';
import { projectsIn } from '../data/projects';
import './Home.css';

export default function Home() {
  return (
    <Page>
      <section className="home-intro frame-sides" aria-labelledby="home-heading">
        <h1 id="home-heading">I design;<br />websites, products, brands, campaigns, billboards, etc</h1>
      </section>
      <RegistrationLine as="h2">All projects</RegistrationLine>
      <section className="project-grid frame-box" aria-label="Selected projects">
        {projectsIn('work').map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
      <section className="home-closer frame-sides">
        <p className="eyebrow caption-2">Have something in mind?</p>
        <h2>Let’s make it<br />mean something.</h2>
        <ButtonLink variant="secondary" to="/about/">Get in touch</ButtonLink>
      </section>
    </Page>
  );
}
