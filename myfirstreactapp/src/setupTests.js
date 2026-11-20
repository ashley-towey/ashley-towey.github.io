import '@testing-library/jest-dom/vitest';

// jsdom lacks these browser APIs used by ButtonLink and smooth scrolling.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
window.scrollTo = () => {};
