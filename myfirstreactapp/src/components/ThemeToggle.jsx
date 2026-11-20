import { useEffect, useState } from 'react';
import { currentTheme, setTheme } from '../lib/theme';
import './ThemeToggle.css';

// Both icons are rendered and CSS shows the right one for the active theme,
// so prerendered HTML is correct before React hydrates.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(currentTheme() === 'dark'), []);

  function toggle() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setDark(next === 'dark');
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label="Dark theme" aria-pressed={dark} title="Toggle dark theme">
      <svg className="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      <svg className="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.4 15.4A8.5 8.5 0 0 1 8.6 3.6 8.5 8.5 0 1 0 20.4 15.4Z" />
      </svg>
    </button>
  );
}
