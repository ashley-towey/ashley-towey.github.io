import { useCallback, useEffect, useRef, useState } from 'react';
import { currentTheme } from '../../lib/theme';

// Hooks shared by the /design-system/ specimens. Everything that touches the
// DOM runs in an effect, so the prerendered page shows the static fallbacks.

// The current theme, kept in sync with whatever changes it (the header toggle
// or the page's own switch) by watching <html data-theme>.
export function useThemeName() {
  const [theme, setThemeName] = useState('light');
  useEffect(() => {
    setThemeName(currentTheme());
    const observer = new MutationObserver(() => setThemeName(currentTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

// The theme change animates for .3s; keep reading a little longer than that.
const MORPH_MS = 450;

// Calls `read` once after mount, then on every frame while the theme morphs
// and whenever the window resizes, so readouts count through the change.
export function useLiveReading(read, theme) {
  const [value, setValue] = useState(null);
  const readRef = useRef(read);
  readRef.current = read;

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      setValue(readRef.current());
      if (now - start < MORPH_MS) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const onResize = () => setValue(readRef.current());
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return value;
}

// Copies text to the clipboard and reports which text was copied last, for
// a moment, so the button that copied it can say so.
export function useCopy() {
  const [copied, setCopied] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (text) => {
    if (!(await writeClipboard(text))) return;
    setCopied(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  }, []);

  return [copied, copy];
}

// The Clipboard API, falling back to the older execCommand route where it's
// missing or blocked. Returns whether the text was copied, so COPIED only
// shows when it really was.
async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.append(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }
}

// The glide back to the start after typing: the same in-out shape as the
// site's cubic-bezier(.65, 0, .35, 1), a little longer than its transitions
// because it can travel a long way.
const GLIDE_MS = 700;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// For a one-line text field that's narrower than its text. Returns props to
// spread on the <input>: data-fade names the edges hiding text ('start',
// 'end' or 'both') for CSS to fade, and on blur, instead of the browser's
// jump back to the start, the text glides back. Pass `deps` that change the
// text's width without typing (e.g. a font size), so the fade is rechecked.
export function useScrollFade(field, deps = []) {
  const [fade, setFade] = useState(undefined);
  // How far it was scrolled while focused, so the browser's own reset on
  // blur doesn't overwrite it.
  const scrolled = useRef(0);
  const glide = useRef();

  const updateFade = useCallback(() => {
    const el = field.current;
    if (!el) return;
    const hiddenStart = el.scrollLeft > 1;
    const hiddenEnd = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
    setFade(hiddenStart && hiddenEnd ? 'both' : hiddenStart ? 'start' : hiddenEnd ? 'end' : undefined);
  }, [field]);

  // Check on load, when the window resizes and when `deps` change.
  useEffect(() => {
    updateFade();
    window.addEventListener('resize', updateFade);
    return () => window.removeEventListener('resize', updateFade);
  }, [updateFade, ...deps]); // deps is spread on purpose: its values decide when to recheck

  useEffect(() => () => cancelAnimationFrame(glide.current), []);

  const onScroll = () => {
    if (document.activeElement === field.current) scrolled.current = field.current.scrollLeft;
    updateFade();
  };

  const onBlur = () => {
    const el = field.current;
    const from = scrolled.current;
    scrolled.current = 0;
    if (from < 1 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / GLIDE_MS);
      el.scrollLeft = from * (1 - easeInOut(t));
      updateFade();
      if (t < 1) glide.current = requestAnimationFrame(step);
    };
    el.scrollLeft = from;
    glide.current = requestAnimationFrame(step);
  };

  return {
    'data-fade': fade,
    onInput: onScroll,
    onScroll,
    onSelect: onScroll,
    onFocus: () => cancelAnimationFrame(glide.current),
    onBlur,
  };
}

// "rgb(207, 203, 192)", "rgba(…)" or "color(srgb .8 .7 .7 / .5)" → "#CFCBC0"
// (with alpha as a percentage when it isn't opaque).
export function toHex(colour) {
  if (!colour) return null;
  let channels;
  let alpha = 1;
  const rgb = colour.match(/rgba?\(([^)]+)\)/);
  const srgb = colour.match(/color\(srgb ([^)]+)\)/);
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    channels = parts.slice(0, 3);
    if (parts.length > 3) alpha = parts[3];
  } else if (srgb) {
    const [rgbPart, alphaPart] = srgb[1].split('/');
    channels = rgbPart.trim().split(/\s+/).map((n) => Number(n) * 255);
    if (alphaPart) alpha = Number(alphaPart);
  } else {
    return null;
  }
  const hex = `#${channels.map((n) => Math.round(n).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
  return alpha < 1 ? `${hex} ${Math.round(alpha * 100)}%` : hex;
}
