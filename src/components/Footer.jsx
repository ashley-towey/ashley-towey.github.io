import ButtonLink from './ButtonLink';
import DotWordmark from './DotWordmark';
import DotDance from './easter-eggs/DotDance'; // easter egg: remove with the line below
import { site } from '../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label="Footer">
        <ButtonLink variant="secondary" to="/">Portfolio</ButtonLink>
        <ButtonLink variant="secondary" to="/experiments/">Experiments</ButtonLink>
        <ButtonLink variant="secondary" to="/about/">Contact me</ButtonLink>
        <ButtonLink variant="secondary" to="/design-system/">Design system</ButtonLink>
      </nav>
      <div className="site-footer__aside">
        {site.socials.map((social) => (
          <ButtonLink key={social.label} variant="secondary" href={social.href} target="_blank" rel="noreferrer">{social.label}</ButtonLink>
        ))}
      </div>
      <span className="site-footer__copyright caption-2">© {new Date().getFullYear()}</span>
      {/* A huge, faint dot-matrix wordmark, cropped by the bottom of the page. */}
      <div className="site-footer__art">
        <DotWordmark />
      </div>
      {/* Easter egg: double-tap the footer to make the dots dance. */}
      <DotDance />
    </footer>
  );
}
