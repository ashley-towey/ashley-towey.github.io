import ButtonLink from './ButtonLink';
import { mailto, site } from '../config/site';

export default function Footer() {
  return (
    <footer className="site-footer caption-2">
      <ButtonLink variant="secondary" to="/">{site.name}</ButtonLink>
      <span>{site.tagline}</span>
      <ButtonLink variant="secondary" href={mailto}>Say hello</ButtonLink>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
