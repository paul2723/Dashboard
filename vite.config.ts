import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/sky-view-reports/', // Debe coincidir con el nombre de tu repositorio
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react()]
});