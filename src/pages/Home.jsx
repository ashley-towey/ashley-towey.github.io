import { Fragment, useCallback, useEffect, useState } from 'react';
import { ToggleButton } from '../components/ButtonLink';
import CategoryWord from '../components/CategoryWord';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import ProjectRow from '../components/ProjectRow';
import RegistrationLine from '../components/RegistrationLine';
import { CATEGORIES, projectsIn, projectsInCategory } from '../data/projects';
import { readStored, writeStored } from '../lib/storage';
import './Home.css';

export const VIEW_KEY = 'portfolio-view';

export default function Home() {
  const [openCategory, setOpenCategory] = useState(null);
  // Prerendered HTML is always the grid; a saved choice of list applies after hydration.
  const [view, setView] = useState('grid');
  const closeCategory = useCallback(() => setOpenCategory(null), []);
  const work = projectsIn('work');

  useEffect(() => {
    if (readStored(VIEW_KEY) === 'list') setView('list');
  }, []);

  function chooseView(next) {
    setView(next);
    writeStored(VIEW_KEY, next);
  }

  return (
    <Page>
      <section className="home-intro home-intro--split frame-sides" aria-labelledby="home-heading">
        <h1 id="home-heading" className="home-intro__heading">
          <span className="home-intro__lead">I design;</span>{' '}
          {CATEGORIES.map(({ key, label }) => (
            <Fragment key={key}>
              <CategoryWord
                label={`${label},`}
                projects={projectsInCategory(key)}
                open={openCategory === key}
                onToggle={() => setOpenCategory(openCategory === key ? null : key)}
                onClose={closeCategory}
              />{' '}
            </Fragment>
          ))}
          <CategoryWord label="etc" projects={[]} />
        </h1>
        <p className="home-intro__bio type-body">
          My work blends creative computing with graphic design to visualize data dynamically. Many of my projects use technology, through physical and digital interactions, to increase agency and accessibility. I strongly believe that it’s important not just to make solutions for people, but to create tools which put ownership back in the hands of the intended audience for them to craft it themselves.
        </p>
      </section>
      <RegistrationLine as="div" className="registration-line--toggle">
        <h2 className="visually-hidden">All projects</h2>
        <ToggleButton pressed={view === 'grid'} onClick={() => chooseView('grid')}>Grid</ToggleButton>
        <ToggleButton pressed={view === 'list'} onClick={() => chooseView('list')}>List</ToggleButton>
      </RegistrationLine>
      <section className={`home-projects home-projects--${view} frame-sides`} aria-label="Selected projects">
        {view === 'grid'
          ? work.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)
          : work.map((project, index) => <ProjectRow key={project.slug} project={project} index={index} />)}
        {view === 'list' && <span className="home-projects__end caption-2" aria-hidden="true">All projects</span>}
      </section>
    </Page>
  );
}
