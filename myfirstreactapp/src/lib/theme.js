// The initial theme is applied by an inline script in index.html before first
// paint (stored choice, else the OS preference). These helpers keep it in sync.
export const THEME_KEY = 'portfolio-theme';
const THEME_COLORS = { light: '#CFCBC0', dark: '#302F2B' };

export function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the theme still applies.
  }
}
