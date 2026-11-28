// The initial theme is applied by an inline script in index.html before first
// paint (stored choice, else the OS preference). These helpers keep it in sync.
export const THEME_KEY = 'portfolio-theme';
const THEME_COLORS = { light: '#CFCBC0', dark: '#302F2B' };

export function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// How long the theme's colours take to change (the transitions on :root in
// tokens.css), with a little to spare.
const THEME_CHANGE_MS = 350;
let changing;

export function setTheme(theme) {
  const root = document.documentElement;
  // While the colours change, pause every element's own transitions (see
  // base.css), so everything follows the one change on :root in step
  // instead of trailing behind it.
  root.setAttribute('data-theme-changing', '');
  clearTimeout(changing);
  changing = setTimeout(() => root.removeAttribute('data-theme-changing'), THEME_CHANGE_MS);
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the theme still applies.
  }
}
