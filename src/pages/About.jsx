import ButtonLink from '../components/ButtonLink';
import ContactForm from '../components/ContactForm';
import Page from '../components/Page';
import Picture from '../components/Picture';
import RegistrationLine from '../components/RegistrationLine';
import { site } from '../config/site';
import { cv } from '../data/about';
import './About.css';

export default function About() {
  return (
    <Page className="about-page">
      <section className="about-contact frame-sides" aria-labelledby="about-heading">
        <div className="about-contact__form">
          <p className="eyebrow caption-2">Get in touch</p>
          <h1 id="about-heading">Have a project in mind? Say hello.</h1>
          <ContactForm />
        </div>
        <div className="about-contact__intro">
          <Picture src="about/headshot_2.jpg" alt="Portrait of Ashley Towey" sizes="(max-width: 780px) 92vw, 40vw" />
          <p className="type-body">I’m Ashley, a designer working between the digital and the physical. I’m currently a Marketing Designer at Encord, living in London, and a graduate of Graphic Communication Design at Central Saint Martins.</p>
          <div className="about-links">
            {site.socials.map((social) => (
              <ButtonLink key={social.label} variant="secondary" href={social.href} target="_blank" rel="noreferrer">{social.label}</ButtonLink>
            ))}
          </div>
        </div>
      </section>
      <RegistrationLine as="h2">CV</RegistrationLine>
      <section className="about-cv frame-sides">
        <div className="about-cv__practice">
          <p className="eyebrow caption-2">Practice</p>
          <p className="about-cv__lead">My work blends creative computing with graphic design to visualise information dynamically. Many of my projects use technology, through physical and digital interactions, to increase agency and engagement.</p>
          <p className="type-body">I like to work between the screen and the world around it: prototyping in code, testing things in the hands of the people they’re for, and carrying one idea across an identity, a website and a printed or physical piece. I believe it’s important not just to make solutions for people, but to make tools that put ownership back in the hands of their audience, so they can shape the result themselves.</p>
        </div>
        <div className="about-cv__columns">
          {cv.map((column) => (
            <div key={column.heading}>
              <h3 className="eyebrow caption-2">{column.heading}</h3>
              <ul>
                {column.entries.map((entry) => (
                  <li key={entry.title}>
                    <span className="about-cv__title">{entry.title}</span>
                    {entry.detail && <span className="about-cv__detail">{entry.detail}</span>}
                    {entry.years && <span className="about-cv__years caption-2">{entry.years}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <RegistrationLine>Experience &amp; interests</RegistrationLine>
      <section className="about-skills frame-sides">
        <div><span className="eyebrow caption-2">01 / Practice</span><p className="type-body">Interaction design<br />Creative technology<br />Identity &amp; art direction<br />Physical computing</p></div>
        <div><span className="eyebrow caption-2">02 / In the toolkit</span><p className="type-body">Prototyping<br />Web design<br />3D design<br />Type &amp; print</p></div>
        <div><span className="eyebrow caption-2">03 / Outside the studio</span><p className="type-body">Road racing &amp; long rides<br />Coffee<br />Good conversations<br />Getting lost on purpose</p></div>
      </section>
    </Page>
  );
}
