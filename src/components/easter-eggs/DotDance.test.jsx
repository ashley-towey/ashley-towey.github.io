import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

// Tests for the footer dot-dance easter egg. Delete along with DotDance.jsx.

const pointerUp = (target, timeStamp) => {
  const event = new Event('pointerup', { bubbles: true });
  Object.defineProperties(event, { timeStamp: { value: timeStamp }, clientX: { value: 10 }, clientY: { value: 10 } });
  target.dispatchEvent(event);
};

test('a double tap in the footer makes every wordmark dot dance; a single tap does not', () => {
  const animate = vi.fn(() => ({ cancel() {} }));
  Element.prototype.animate = animate;
  Element.prototype.getAnimations = () => [];

  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  const footer = document.querySelector('.site-footer');
  const dots = document.querySelectorAll('.dot-wordmark__dot');

  pointerUp(footer, 1000);
  expect(animate).not.toHaveBeenCalled();

  pointerUp(footer, 1200);
  expect(animate).toHaveBeenCalledTimes(dots.length);

  // Taps too far apart in time don't count.
  animate.mockClear();
  pointerUp(footer, 3000);
  pointerUp(footer, 4000);
  expect(animate).not.toHaveBeenCalled();

  delete Element.prototype.animate;
  delete Element.prototype.getAnimations;
});
