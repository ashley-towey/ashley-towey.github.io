import { useRef, useState } from 'react';
import ButtonLink, { ToggleButton } from '../components/ButtonLink';
import CopyToken from '../components/design-system/CopyToken';
import DotPlayground from '../components/design-system/DotPlayground';
import EasingCurve from '../components/design-system/EasingCurve';
import GridOverlay from '../components/design-system/GridOverlay';
import { useCopy, useLiveReading, useThemeName } from '../components/design-system/hooks';
import Swatch from '../components/design-system/Swatch';
import TypeScale from '../components/design-system/TypeScale';
import TypeTester from '../components/design-system/TypeTester';
import Page from '../components/Page';
import ProjectCard from '../components/ProjectCard';
import ProjectRow from '../components/ProjectRow';
import RegistrationLine from '../components/RegistrationLine';
import ThemeToggle, { MoonIcon, SunIcon } from '../components/ThemeToggle';
import { colours, easing, intro, spacing, typeStyles } from '../data/design-system';
import { projects } from '../data/projects';
import { setTheme } from '../lib/theme';
import '../components/ContactForm.css';
import './Home.css';
import './DesignSystem.css';

export const SECTIONS = [
  { id: 'colour', title: 'Colour' },
  { id: 'type', title: 'Typography' },
  { id: 'components', title: 'Components' },
  { id: 'grid', title: 'Grid, spacing & motion' },
  { id: 'dots', title: 'Dot matrix' },
];

const numberOf = (id) => String(SECTIONS.findIndex((section) => section.id === id) + 1).padStart(2, '0');

// /design-system/: a live specimen of the system this site is built with.
// Everything on it is the real CSS and the real components, so it can't
// drift from the rest of the site.
export default function DesignSystem() {
  const theme = useThemeName();
  const [copied, copy] = useCopy();
  const [gridOn, setGridOn] = useState(false);

  return (
    <Page className="ds-page">
      <section className="ds-intro frame-sides" aria-labelledby="ds-heading">
        <h1 id="ds-heading" className="type-h1">
          <span className="ds-intro__lead">{intro.lead}</span> {intro.heading}
        </h1>
        <div className="ds-intro__side">
          <p className="type-body">{intro.body}</p>
          <ThemeButtons theme={theme} />
        </div>
        <nav className="ds-intro__contents" aria-label="On this page">
          {SECTIONS.map((section) => (
            <ButtonLink key={section.id} variant="secondary" href={`#${section.id}`}>
              {numberOf(section.id)} {section.title}
            </ButtonLink>
          ))}
        </nav>
        {/* Screen readers hear copy confirmations here. */}
        <p className="visually-hidden" role="status">{copied ? `Copied ${copied}` : ''}</p>
      </section>

      <SectionLine id="colour" />
      <section id="colour" className="ds-section frame-sides" aria-labelledby="colour-heading">
        <ul className="ds-swatches">
          {colours.map((colour) => (
            <Swatch key={colour.token} colour={colour} theme={theme} copied={copied} onCopy={copy} />
          ))}
        </ul>
      </section>

      <SectionLine id="type" />
      <section id="type" className="ds-section frame-sides" aria-labelledby="type-heading">
        <TypeTester />
        <TypeScale styles={typeStyles} theme={theme} copied={copied} onCopy={copy} />
      </section>

      <SectionLine id="components" />
      <section id="components" className="ds-section frame-sides" aria-labelledby="components-heading">
        <ComponentSpecimens />
      </section>

      <SectionLine id="grid">
        <ToggleButton pressed={gridOn} onClick={() => setGridOn((on) => !on)}>Show grid</ToggleButton>
      </SectionLine>
      <section id="grid" className="ds-section frame-sides" aria-labelledby="grid-heading">
        <ul className="ds-spacing">
          {spacing.map((token) => (
            <SpacingToken key={token.token} token={token} theme={theme} copied={copied} onCopy={copy} />
          ))}
        </ul>
        <EasingCurve easing={easing} />
      </section>

      <SectionLine id="dots" />
      <section id="dots" className="ds-section ds-section--dots frame-sides" aria-labelledby="dots-heading">
        <DotPlayground />
      </section>

      {gridOn && <GridOverlay />}
    </Page>
  );
}

// A section's registration line: its number and title on the right, like
// every other section label on the site, with anything extra beside them.
function SectionLine({ id, children }) {
  const section = SECTIONS.find((item) => item.id === id);
  return (
    <RegistrationLine as="div" className="ds-line">
      {children}
      <h2 id={`${id}-heading`} className="ds-line__heading">
        {numberOf(id)} {section.title}
      </h2>
    </RegistrationLine>
  );
}

// Light and Dark: the nav's round icon button with a plain label beside it.
// Only the circle is a button; the active one is filled. Every colour on the site is
// a registered custom property that transitions, so switching morphs the
// whole page at once.
const THEMES = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
];

// Each button's colours come from the real light and dark values (and so
// are checked against tokens.css by the tests), not the live --ink and
// --paper: those swap roles between themes, so a button using them would
// flash the wrong shade mid-change.
const ink = colours.find((c) => c.token === '--ink');
const paper = colours.find((c) => c.token === '--paper');
const THEME_BUTTON_COLOURS = {
  '--light-ink': ink.light,
  '--light-paper': paper.light,
  '--dark-ink': ink.dark,
  '--dark-paper': paper.dark,
};

function ThemeButtons({ theme }) {
  return (
    <div className="ds-theme-buttons" role="group" aria-label="Theme" style={THEME_BUTTON_COLOURS}>
      {THEMES.map(({ value, label, Icon }) => (
        <span key={value} className="ds-theme-option">
          <button
            type="button"
            className={`ds-theme-button ds-theme-button--${value}`}
            data-theme-sync
            aria-pressed={theme === value}
            aria-label={label}
            onClick={() => setTheme(value)}
          >
            <Icon className="ds-theme-button__icon" />
          </button>
          {/* Plain text: only the circle is the button. */}
          <span className="caption-2" aria-hidden="true">{label}</span>
        </span>
      ))}
    </div>
  );
}

// One spacing or shape token, drawn at its real size and measured back.
function SpacingToken({ token, theme, copied, onCopy }) {
  const shape = useRef(null);
  const size = useLiveReading(() => {
    const css = getComputedStyle(shape.current);
    return `${Math.round(parseFloat(token.corner ? css.borderTopLeftRadius : css.width))}px`;
  }, theme);
  const text = `var(${token.token})`;

  return (
    <li className="ds-spacing__row">
      <CopyToken label={token.token} text={text} copied={copied} onCopy={onCopy} />
      <span className="ds-spacing__visual">
        {token.corner
          ? <span ref={shape} className="ds-spacing__corner" />
          : <span ref={shape} className="ds-spacing__bar" style={{ width: `var(${token.token})` }} />}
      </span>
      <span className="ds-spacing__size type-numerical-lg">{size ?? '—'}</span>
      <span className="ds-spacing__role type-body">{token.role}</span>
    </li>
  );
}

// The site's components, live. Hover, press and type in them.
function ComponentSpecimens() {
  const [view, setView] = useState('grid');
  const project = projects[0];

  return (
    <div className="ds-components">
      <Specimen name="Primary button" props="ButtonLink first second">
        <ButtonLink first="Ashley" second="Towey" to="/" />
      </Specimen>
      <Specimen name="Bracket button" props='ButtonLink variant="secondary"'>
        <ButtonLink variant="secondary" href="#components">Resting</ButtonLink>
        <ButtonLink variant="secondary" href="#components" active>Active</ButtonLink>
      </Specimen>
      <Specimen name="Toggle" props="ToggleButton pressed">
        <ToggleButton pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</ToggleButton>
        <ToggleButton pressed={view === 'list'} onClick={() => setView('list')}>List</ToggleButton>
      </Specimen>
      <Specimen name="Theme toggle" props="ThemeToggle">
        <ThemeToggle />
      </Specimen>
      <Specimen name="Form field" props=".contact-form__field" wide>
        <div className="contact-form ds-components__field">
          <label className="contact-form__field">
            <span className="caption-2">Your name</span>
            <input type="text" placeholder="Type here" autoComplete="off" />
          </label>
        </div>
      </Specimen>
      <Specimen name="Registration line & frame" props="RegistrationLine · .frame-box" wide>
        <div className="ds-components__frame">
          <RegistrationLine>Section label</RegistrationLine>
          <div className="frame-box ds-components__frame-box" />
        </div>
      </Specimen>
      <Specimen name="Project card" props="ProjectCard" wide>
        <div className="ds-components__card">
          <ProjectCard project={project} index={0} />
        </div>
      </Specimen>
      <Specimen name="Project row" props="ProjectRow" wide>
        <div className="ds-components__row">
          <ProjectRow project={project} index={0} />
        </div>
      </Specimen>
    </div>
  );
}

function Specimen({ name, props, wide = false, children }) {
  return (
    <figure className={wide ? 'ds-specimen ds-specimen--wide' : 'ds-specimen'}>
      <div className="ds-specimen__stage">{children}</div>
      <figcaption className="ds-specimen__caption">
        <span className="caption-1">{name}</span>
        <code className="ds-token caption-2">{props}</code>
      </figcaption>
    </figure>
  );
}
