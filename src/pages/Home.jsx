import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToggleButton } from '../components/ButtonLink';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import ProjectRow from '../components/ProjectRow';
import RegistrationLine from '../components/RegistrationLine';
import { HEADLINE, getProject, projectsIn } from '../data/projects';
import { projectPath } from '../lib/paths';
import { readStored, writeStored } from '../lib/storage';
import './Home.css';

export const VIEW_KEY = 'portfolio-view';

export default function Home() {
  // Prerendered HTML is always the grid; a saved choice of list applies after hydration.
  const [view, setView] = useState('grid');
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
          {HEADLINE.map((word, index) => (
            <Fragment key={word.label}>
              <HeadlineWord word={word} work={work} last={index === HEADLINE.length - 1} />
              {index < HEADLINE.length - 1 && ' '}
            </Fragment>
          ))}
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

// One word of the heading. Its bracketed number links to a project (showing
// the project's position in the portfolio) or to a page (showing a count),
// with a tooltip naming it.
function HeadlineWord({ word, work, last }) {
  const project = word.project && getProject(word.project, 'work');
  const to = project ? projectPath(project) : word.to;
  const number = project ? work.indexOf(project) + 1 : word.count();
  const title = project ? project.title : word.linkLabel;

  return (
    <span className="headline-word">
      {last ? word.label : `${word.label},`}
      <sup className="headline-word__number caption-2">
        <Link to={to} aria-label={title}>
          [{number}]
          {/* Empty on purpose: CSS draws the title from data-title, so it stays
              out of the heading's text. The link's aria-label names it. */}
          <span className="headline-word__tip" data-title={title} aria-hidden="true" />
        </Link>
      </sup>
    </span>
  );
}
