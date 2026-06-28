import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Note: the PWA service worker is hand-written (public/sw.js) and registered in
// main.tsx. We deliberately avoid vite-plugin-pwa's workbox-build codepath, which
// breaks under Node 18's ESM loader ("Dynamic require of workbox-build"). A tiny
// dependency-free SW keeps the build identical on Node 18 (local) and Node 20 (CI).
export default defineConfig({
  base: '/frontend-webvitals-lab/',
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
