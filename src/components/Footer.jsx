import { useLocation } from 'react-router-dom';
import ButtonLink from './ButtonLink';
import { mailto, site } from '../config/site';

export default function Footer() {
  // The home page already ends with a "Get in touch" prompt, so skip the
  // footer's email button there.
  const isHome = useLocation().pathname === '/';

  return (
    <footer className="site-footer caption-2">
      <ButtonLink variant="secondary" to="/">{site.name}</ButtonLink>
      <span>{site.tagline}</span>
      <ButtonLink variant="secondary" to="/experiments/">Experiments</ButtonLink>
      {!isHome && <ButtonLink variant="secondary" href={mailto}>Say hello</ButtonLink>}
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
