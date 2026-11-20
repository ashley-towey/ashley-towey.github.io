import ButtonLink from './ButtonLink';
import DotWordmark from './DotWordmark';
import { site } from '../config/site';

const linkedIn = site.socials.find((social) => social.label === 'LinkedIn');

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav className="site-footer__links" aria-label="Footer">
        <ButtonLink variant="secondary" to="/">Portfolio</ButtonLink>
        <ButtonLink variant="secondary" to="/experiments/">Experiments</ButtonLink>
        <ButtonLink variant="secondary" to="/about/">Contact me</ButtonLink>
      </nav>
      <div className="site-footer__aside">
        {linkedIn && <ButtonLink variant="secondary" href={linkedIn.href} target="_blank" rel="noreferrer">LinkedIn</ButtonLink>}
        <span className="caption-2">© {new Date().getFullYear()}</span>
      </div>
      {/* A huge, faint dot-matrix wordmark, cropped by the bottom of the page. */}
      <div className="site-footer__art">
        <DotWordmark />
      </div>
    </footer>
  );
}
