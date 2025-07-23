import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',  // Importante para despliegues genéricos
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})