import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app is served from /preview/ until the cutover replaces the legacy site,
// at which point this becomes '/'.
export default defineConfig({
  base: '/preview/',
  plugins: [react()],
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
});
