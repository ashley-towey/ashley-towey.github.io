import { useEffect } from 'react';
import { dance } from '../../lib/dot-dance';

// EASTER EGG: double-tap (or double-click) anywhere in the footer and the
// dots in the big "ashley" do a random dance.
//
// Self-contained on purpose. It renders nothing, finds the wordmark's dots
// in the page, and animates them with the shared dances in lib/dot-dance.js,
// so the wordmark component knows nothing about it. To turn it off, remove
// <DotDance /> from Footer.jsx (or delete this folder).

const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_DISTANCE = 30; // px between the two taps

export default function DotDance({ target = '.site-footer' }) {
  useEffect(() => {
    const root = document.querySelector(target);
    if (!root) return undefined;

    // pointerup covers mouse double-clicks and touch double-taps alike
    // (mobile browsers don't reliably send dblclick).
    let lastTap = null;
    const onPointerUp = (event) => {
      const tap = { time: event.timeStamp, x: event.clientX, y: event.clientY };
      const isDouble = lastTap
        && tap.time - lastTap.time < DOUBLE_TAP_MS
        && Math.hypot(tap.x - lastTap.x, tap.y - lastTap.y) < DOUBLE_TAP_DISTANCE;
      if (isDouble) {
        lastTap = null;
        dance(root);
      } else {
        lastTap = tap;
      }
    };

    root.addEventListener('pointerup', onPointerUp);
    return () => root.removeEventListener('pointerup', onPointerUp);
  }, [target]);

  return null;
}
