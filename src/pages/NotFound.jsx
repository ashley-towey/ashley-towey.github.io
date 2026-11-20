import ButtonLink from '../components/ButtonLink';
import Page from '../components/Page';

export default function NotFound({ eyebrow = 'Page not found' }) {
  return (
    <Page className="not-found frame-sides">
      <p className="eyebrow caption-2">{eyebrow}</p>
      <h1>Let’s get you back to the work.</h1>
      <ButtonLink variant="secondary" to="/">View all projects</ButtonLink>
    </Page>
  );
}
