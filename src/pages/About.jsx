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
          <h1 id="about-heading"><span className="about-contact__lead">Say hello.</span> Get in touch.</h1>
          <ContactForm />
        </div>
        <div className="about-contact__intro">
          <Picture src="about/headshot_2.jpg" alt="Portrait of Ashley Towey" sizes="(max-width: 780px) 92vw, 40vw" />
          <p className="type-body">I’m currently working as a Marketing Designer at Encord, based in London, and a graduate of Graphic Communication Design course at Central Saint Martins.</p>
          <div className="about-links">
            {site.socials.map((social) => (
              <ButtonLink key={social.label} variant="secondary" href={social.href} target="_blank" rel="noreferrer">{social.label}</ButtonLink>
            ))}
          </div>
        </div>
      </section>
      <RegistrationLine as="h2">My practice</RegistrationLine>
      <section className="about-cv frame-sides">
        <div className="about-cv__practice">
          <p className="about-cv__lead">My work blends creative computing with graphic design to visualise information dynamically. Many of my projects use technology, through physical and digital interactions, to increase agency and engagement.</p>
          <p className="type-body">I like to work between the screen and the world around it: prototyping in code, testing things in the hands of the people they’re for, and carrying one idea across an identity, a website and a printed or physical piece. I believe it’s important not just to make solutions for people, but to make tools that put ownership back in the hands of their audience, so they can shape the result themselves.</p>
        </div>
        <div className="about-cv__columns">
          {cv.map((column) => (
            <div key={column.heading}>
              <h3 className="eyebrow caption-2">{column.heading}</h3>
              <ul>
                {column.entries.map((entry) => (
                  <li key={entry.title ?? entry.detail}>
                    {entry.title && <span className="about-cv__title">{entry.title}</span>}
                    {entry.detail && <span className="about-cv__detail">{entry.detail}</span>}
                    {entry.years && <span className="about-cv__years caption-2">{entry.years}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
