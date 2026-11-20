import ButtonLink from './ButtonLink';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="site-header">
      <ButtonLink first="Ashley" second="Towey" to="/" />
      <nav aria-label="Main navigation">
        {/* Temporarily hidden. To bring it back, uncomment this line:
        <ButtonLink first="Contact" second="me" to="/about/" /> */}
        <ThemeToggle />
      </nav>
    </header>
  );
}
