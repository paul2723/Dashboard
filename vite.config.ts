import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dashboard/", // Se mantiene la base de la URL
  plugins: [
    react(),
  ],
});