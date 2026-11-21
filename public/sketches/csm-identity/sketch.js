// Maps the pointer's position across the page to the typeface's 'opsz' axis (0–100).
const mark = document.querySelector('.mark');
const EDGE = 100; // px at each side that hold the axis at its min/max

function setAxis(clientX) {
  const span = Math.max(window.innerWidth - EDGE * 2, 1);
  const t = Math.min(Math.max((clientX - EDGE) / span, 0), 1);
  mark.style.fontVariationSettings = `'opsz' ${(t * 100).toFixed(1)}`;
}

window.addEventListener('pointermove', (e) => setAxis(e.clientX));
window.addEventListener('pointerdown', (e) => setAxis(e.clientX));
