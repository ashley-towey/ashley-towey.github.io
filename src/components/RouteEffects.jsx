import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta } from '../routes';

// On client-side navigation: update the title, return to the top, clear any
// text selection, and move focus to the new page so screen readers announce
// it.
export default function RouteEffects() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    document.title = routeMeta(pathname).title;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    // A selection left on the old page would otherwise carry over: once its
    // text is replaced, the browser can stretch it across the whole new page.
    window.getSelection()?.removeAllRanges();
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
