import { useEffect, useState } from 'react';
import ButtonLink from './components/ButtonLink';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const projects = [
  {
    slug: 'domestique-display', title: 'The Domestique Display', client: 'Central Saint Martins Shows', year: '2024',
    disciplines: ['Creative technology', 'Data visualisation', 'Physical computing'],
    description: 'The word domestique describes the rider who supports their team and leader. This customisable matrix display brings spectators closer to a cycling event by combining live data with audience interaction. It was shown at Central Saint Martins Shows 2024.',
    cover: 'domestique-displays/cover-domestique.jpg', alt: 'The Domestique Display showing a live graphic at a cycling event',
    gallery: ['domestique-displays/domestique_1.jpg', 'domestique-displays/screen-data-display.jpg', 'domestique-displays/physical-display_1.jpg'],
  },
  {
    slug: 'slate', title: 'SLATE', client: 'SLATE', year: '',
    disciplines: ['Accessible design', 'Creative computing', 'Branding'],
    description: 'A collection of tools designed to help people with additional needs communicate with family, friends and guardians. SLATE explores how tactile objects and a shared visual language can make everyday communication more accessible.',
    cover: 'SLATE/slate-box-1.jpg', alt: 'The SLATE routine card deck and accessible communication tools',
    gallery: ['SLATE/slate-3.jpg', 'SLATE/slate-2.jpg', 'SLATE/process-2.jpg'],
  },
  {
    slug: 'csm-showcase', title: 'CSM Showcase Identity', client: 'Central Saint Martins', year: '2024',
    disciplines: ['Identity', 'Art direction', 'Digital design'],
    description: 'A comprehensive identity for the 2024 Central Saint Martins Showcase. The visual system brings together the energy, independence and craft of the graduating community across digital and physical spaces.',
    cover: 'csm-shows/csm-shows_1.jpg', alt: 'Central Saint Martins Showcase identity in a gallery setting',
    gallery: ['csm-shows/granary-window-1.jpg', 'csm-shows/shows-posters-1.jpg'],
  },
  {
    slug: 'velocafe', title: 'The Velocafé', client: 'Independent project', year: '',
    disciplines: ['Creative technology', 'Print design', 'Branding'],
    description: 'Reimagining the cycling café through a connected design system. Computational visuals and designed ephemera make the sense of community around coffee, cake and cycling visible.',
    cover: 'velocafe/velocafe-3.jpg', alt: 'Velocafé visual identity and cycling café ephemera',
    gallery: ['velocafe/computing-2.jpg', 'velocafe/velocafe-1.jpg', 'velocafe/cards-1.jpg'],
  },
  {
    slug: 'networked-beings', title: 'Networked Beings', client: 'Independent project', year: '',
    disciplines: ['Physical computing', 'Product design', '3D modelling'],
    description: 'Three networked objects explore how form changes our desire to interact. Small gestures connect the objects, turning light into a quiet language between people and things.',
    cover: 'networked-beings/networked-beings-cover_2.jpg', alt: 'Three Networked Beings objects arranged in space',
    gallery: ['networked-beings/networked-1.jpg', 'networked-beings/networked-show-3.jpg'],
  },
  {
    slug: 'london-to-paris', title: 'London to Paris', client: 'Kalas / Cure Leukaemia', year: '2019–20',
    disciplines: ['Sportswear', 'Art direction', 'Print design'],
    description: 'A series of cycling jerseys created for Cure Leukaemia’s London to Paris event. The designs bring riders together around a shared journey and a shared cause.',
    cover: 'l2p/L2P_cover.jpg', alt: 'London to Paris cycling event jersey design',
    gallery: ['l2p/L2P_2020_Lineup_2.jpg', 'l2p/l2p-event.jpg', 'l2p/L2P_day1_2.jpg'],
  },
  {
    slug: 'leanne-prosvic', title: 'Leanne Prosvic', client: 'Leanne Prosvic', year: '',
    disciplines: ['Brand identity', 'Print design', 'Art direction'],
    description: 'A warm and considered identity for Leanne Prosvic’s counselling and psychotherapy practice, based in Oxford and Henley-on-Thames.',
    cover: 'leanne-prosvic/leanne-cover.jpg', alt: 'Leanne Prosvic counselling practice identity',
    gallery: ['leanne-prosvic/leanne-prosvic-2.jpeg', 'leanne-prosvic/branding-13.jpg'],
  },
  {
    slug: 'think-twice', title: 'Think Twice', client: 'BBC UX&D', year: '',
    disciplines: ['Digital service', 'Research', 'Interaction design'],
    description: 'A mobile experience that encourages young adults to make more conscious shopping decisions by showing the human and environmental stories behind everyday products.',
    cover: 'think-twice/think-cover-2.jpg', alt: 'Think Twice project identity',
    gallery: ['think-twice/think_mockup_1.jpg', 'think-twice/think_ideas_1.jpg'],
  },
  {
    slug: 'jupiter-heating', title: 'Jupiter Heating Solutions', client: 'Jupiter Heating Solutions', year: '',
    disciplines: ['3D visualisation', 'Product communication', 'Art direction'],
    description: 'Over 80 refreshed 3D constructions and an animation for Jupiter Heating Solutions’ website redesign. The imagery explains the configurable underfloor heating system across the website and technical materials.',
    cover: 'jupiter-heating/jupiter-cover_1.jpg', alt: 'Underfloor heating product visualisation for Jupiter Heating Solutions',
    gallery: ['jupiter-heating/jupiter-hero-3.jpg', 'jupiter-heating/EPS-40G_1.jpg'],
  },
  {
    slug: 'stories-for-the-road', title: 'Stories for the Road', client: 'Independent project', year: '',
    disciplines: ['Digital service', 'Type design', 'Community'],
    description: 'A digital service exploring how technology can help cyclists build community and take back ownership of the roads through shared recommendations, encouragement and stories.',
    cover: 'stories/stories-cover_1.jpg', alt: 'Stories for the Road project cover',
    gallery: ['stories/homepage-1.jpg', 'stories/directory-1.jpg'],
  },
];

const publicUrl = process.env.PUBLIC_URL || '';
const imageUrl = (path) => `${publicUrl}/portfolio/${path}`;

function currentRoute() {
  return window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/';
}

function useRoute() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const update = () => setRoute(currentRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  function navigate(path) {
    if (path === currentRoute()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = path;
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function linkProps(path) {
    return {
      href: `#${path}`,
      onClick: (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(path);
      },
    };
  }

  return { route, navigate, linkProps };
}

function Header({ linkProps, darkMode, setDarkMode }) {
  return (
    <header className="site-header">
      <ButtonLink first="Ashley" second="Towey" {...linkProps('/')} />
      <nav aria-label="Main navigation">
        <ButtonLink first="Contact" second="me" {...linkProps('/about')} />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>
    </header>
  );
}

function RegistrationLine({ children, id }) {
  return <div className="registration-line" id={id}><span>{children}</span></div>;
}

function ProjectCard({ project, index, linkProps }) {
  return (
    <a className="project-card" {...linkProps(`/project/${project.slug}`)}>
      <div className="project-card__image">
        <img src={imageUrl(project.cover)} alt={project.alt} loading={index < 3 ? 'eager' : 'lazy'} />
        <span className="project-card__caption">
          <span className="project-card__title">{project.title}</span>
          <span className="project-card__description">{project.description}</span>
          <span className="project-card__open">View project</span>
        </span>
      </div>
    </a>
  );
}

function Home({ linkProps }) {
  return (
    <main>
      <section className="home-intro frame-sides" aria-labelledby="home-heading">
        <h1 id="home-heading">A collection of projects by Ashley Towey, computing, design and creativity.</h1>
      </section>
      <RegistrationLine id="projects">All projects</RegistrationLine>
      <section className="project-grid frame-sides" aria-label="Selected projects">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} linkProps={linkProps} />)}
      </section>
      <section className="home-closer frame-sides">
        <p className="eyebrow">Have something in mind?</p>
        <h2>Let’s make it<br />mean something.</h2>
        <ButtonLink variant="secondary" {...linkProps('/about')}>Get in touch</ButtonLink>
      </section>
    </main>
  );
}

function ProjectPage({ project, linkProps, onNavigate }) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <main className="project-page">
      <section className="project-intro frame-sides">
        <div className="project-intro__title">
          <p className="eyebrow">Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
          <h1>{project.title}</h1>
          <div className="client-block"><span className="eyebrow">Client</span><strong>{project.client}</strong></div>
        </div>
        <p className="project-intro__description">{project.description}</p>
        <div className="project-intro__meta">
          <span className="eyebrow">Disciplines</span>
          <ul>{project.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>
      </section>
      <RegistrationLine>Project imagery</RegistrationLine>
      <section className="project-gallery" aria-label={`${project.title} project images`}>
        {[project.cover, ...project.gallery].map((image, i) => (
          <figure className={i === 0 ? 'gallery-image gallery-image--hero' : 'gallery-image'} key={image}>
            <img src={imageUrl(image)} alt={`${project.title} project view ${i + 1}`} loading={i < 2 ? 'eager' : 'lazy'} />
          </figure>
        ))}
      </section>
      <section className="next-project frame-sides">
        <span className="eyebrow">Next project</span>
        <button className="next-project__link" type="button" onClick={() => onNavigate(`/project/${nextProject.slug}`)}>
          <span>{nextProject.title}</span>
        </button>
        <ButtonLink variant="secondary" {...linkProps('/')}>All projects</ButtonLink>
      </section>
    </main>
  );
}

function About({ linkProps }) {
  return (
    <main className="about-page">
      <section className="about-intro frame-sides">
        <div>
          <p className="eyebrow">About Ashley</p>
          <h1>Designer, programmer and cyclist.</h1>
        </div>
        <p className="about-lede">I’m a designer working between the digital and physical. My practice uses interaction, identity and technology to make useful, thoughtful experiences.</p>
      </section>
      <RegistrationLine>About</RegistrationLine>
      <section className="about-details frame-sides">
        <div className="about-photo">
          <img src={imageUrl('about-profile.jpeg')} alt="Portrait of Ashley Towey" />
          <span className="eyebrow">London, UK · Available for select projects</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">A little more</p>
          <h2>Curiosity in motion.</h2>
          <p>I’m currently studying Graphic Communication Design at Central Saint Martins and have completed a Diploma in Creative Computing. I explore how design and technology can give people more agency, especially when experiences connect the screen with the world around us.</p>
          <p>Cycling is the lens through which I see much of the world: a way to travel, notice, and make connections. It often finds its way into the projects I make.</p>
          <div className="about-links">
            <ButtonLink variant="secondary" href="mailto:toweyashley@yahoo.co.uk">Email me</ButtonLink>
            <ButtonLink variant="secondary" href="https://www.instagram.com/echelon__design/" target="_blank" rel="noreferrer">Instagram</ButtonLink>
            <ButtonLink variant="secondary" href="https://www.linkedin.com/in/ashley-towey/" target="_blank" rel="noreferrer">LinkedIn</ButtonLink>
          </div>
        </div>
      </section>
      <RegistrationLine>Experience &amp; interests</RegistrationLine>
      <section className="about-skills frame-sides">
        <div><span className="eyebrow">01 / Practice</span><p>Interaction design<br />Creative technology<br />Identity &amp; art direction<br />Physical computing</p></div>
        <div><span className="eyebrow">02 / In the toolkit</span><p>Prototyping<br />Web design<br />3D design<br />Type &amp; print</p></div>
        <div><span className="eyebrow">03 / Outside the studio</span><p>Cycling<br />Coffee<br />Good conversations<br />Getting lost on purpose</p></div>
      </section>
      <RegistrationLine>Contact</RegistrationLine>
      <section className="about-closer frame-sides">
        <p className="eyebrow">Have a project in mind?</p>
        <ButtonLink variant="secondary" href="mailto:toweyashley@yahoo.co.uk">Start a conversation</ButtonLink>
        <ButtonLink variant="secondary" {...linkProps('/')}>← Back to the work</ButtonLink>
      </section>
    </main>
  );
}

function Footer({ linkProps }) {
  return (
    <footer className="site-footer">
      <ButtonLink variant="secondary" {...linkProps('/')}>Ashley Towey</ButtonLink>
      <span>Design · Computing · Creativity</span>
      <ButtonLink variant="secondary" href="mailto:toweyashley@yahoo.co.uk">Say hello</ButtonLink>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}

function App() {
  const { route, navigate, linkProps } = useRoute();
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('portfolio-theme') === 'dark');
  const projectMatch = route.match(/^\/project\/([^/]+)\/?$/);
  const project = projectMatch ? projects.find((item) => item.slug === projectMatch[1]) : null;

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#302F2B' : '#CFCBC0');
  }, [darkMode]);

  useEffect(() => {
    const title = project ? `${project.title} — Ashley Towey` : route.startsWith('/about') ? 'About — Ashley Towey' : 'Ashley Towey — Selected work';
    document.title = title;
  }, [project, route]);

  let page;
  if (route.startsWith('/about')) page = <About linkProps={linkProps} />;
  else if (project) page = <ProjectPage project={project} linkProps={linkProps} onNavigate={navigate} />;
  else if (projectMatch) page = <main className="not-found frame-sides"><p className="eyebrow">Project not found</p><h1>Let’s get you back to the work.</h1><ButtonLink variant="secondary" {...linkProps('/')}>View all projects</ButtonLink></main>;
  else page = <Home linkProps={linkProps} />;

  return (
    <div className="site-shell">
      <Header linkProps={linkProps} darkMode={darkMode} setDarkMode={setDarkMode} />
      {page}
      <Footer linkProps={linkProps} />
    </div>
  );
}

export default App;
