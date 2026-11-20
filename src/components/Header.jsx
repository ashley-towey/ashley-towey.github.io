import { lab } from '../data/lab';
import ButtonLink from './ButtonLink';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="site-header">
      <ButtonLink first="Ashley" second="Towey" to="/" />
      <nav aria-label="Main navigation">
        {lab.length > 0 && <ButtonLink first="The" second="lab" to="/lab/" />}
        <ButtonLink first="Contact" second="me" to="/about/" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
