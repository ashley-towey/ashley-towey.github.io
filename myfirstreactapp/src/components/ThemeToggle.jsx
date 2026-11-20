import './ThemeToggle.css';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  const nextTheme = darkMode ? 'light' : 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
        {darkMode ? (
          <path d="M20.4 15.4A8.5 8.5 0 0 1 8.6 3.6 8.5 8.5 0 1 0 20.4 15.4Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        )}
      </svg>
    </button>
  );
}
