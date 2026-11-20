import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';
import RegistrationLine from '../components/RegistrationLine';
import { mailto, site } from '../config/site';
import Picture from '../components/Picture';
import './About.css';

export default function About() {
  return (
    <Page className="about-page">
      <section className="about-intro frame-sides">
        <div>
          <p className="eyebrow caption-2">About Ashley</p>
          <h1>Designer, programmer and cyclist.</h1>
        </div>
        <p className="type-body">I’m a designer working between the digital and physical. My practice uses interaction, identity and technology to make useful, thoughtful experiences.</p>
      </section>
      <RegistrationLine>About</RegistrationLine>
      <section className="about-details frame-sides">
        <div className="about-photo">
          <Picture src="about-profile.jpeg" alt="Portrait of Ashley Towey" sizes="(max-width: 780px) 92vw, 40vw" />
          <span className="eyebrow caption-2">{site.location} · Available for select projects</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow caption-2">A little more</p>
          <h2>Curiosity in motion.</h2>
          <p className="type-body">I’m currently studying Graphic Communication Design at Central Saint Martins and have completed a Diploma in Creative Computing. I explore how design and technology can give people more agency, especially when experiences connect the screen with the world around us.</p>
          <p className="type-body">Cycling is the lens through which I see much of the world: a way to travel, notice, and make connections. It often finds its way into the projects I make.</p>
          <div className="about-links">
            <ButtonLink variant="secondary" href={mailto}>Email me</ButtonLink>
            {site.socials.map((social) => (
              <ButtonLink key={social.label} variant="secondary" href={social.href} target="_blank" rel="noreferrer">{social.label}</ButtonLink>
            ))}
          </div>
        </div>
      </section>
      <RegistrationLine>Experience &amp; interests</RegistrationLine>
      <section className="about-skills frame-sides">
        <div><span className="eyebrow caption-2">01 / Practice</span><p className="type-body">Interaction design<br />Creative technology<br />Identity &amp; art direction<br />Physical computing</p></div>
        <div><span className="eyebrow caption-2">02 / In the toolkit</span><p className="type-body">Prototyping<br />Web design<br />3D design<br />Type &amp; print</p></div>
        <div><span className="eyebrow caption-2">03 / Outside the studio</span><p className="type-body">Cycling<br />Coffee<br />Good conversations<br />Getting lost on purpose</p></div>
      </section>
      <RegistrationLine>Contact</RegistrationLine>
      <section className="about-closer frame-sides">
        <p className="eyebrow caption-2">Have a project in mind?</p>
        <ButtonLink variant="secondary" href={mailto}>Start a conversation</ButtonLink>
        <ButtonLink variant="secondary" to="/">← Back to the work</ButtonLink>
      </section>
    </Page>
  );
}
