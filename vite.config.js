import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'jekyll-and-cname-handler',
      closeBundle() {
        const distPath = resolve(__dirname, 'dist');
        
        // Asegurar que el directorio dist existe
        if (!fs.existsSync(distPath)) {
          fs.mkdirSync(distPath, { recursive: true });
        }

        // Crear .nojekyll
        const nojekyllPath = resolve(distPath, '.nojekyll');
        if (!fs.existsSync(nojekyllPath)) {
          fs.writeFileSync(nojekyllPath, '');
        }

        // Manejar CNAME si existe
        const cnameSrc = resolve(__dirname, 'CNAME');
        const cnameDest = resolve(distPath, 'CNAME');
        if (fs.existsSync(cnameSrc) && !fs.existsSync(cnameDest)) {
          fs.copyFileSync(cnameSrc, cnameDest);
        }
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].mjs',
        chunkFileNames: 'assets/[name].[hash].mjs',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    host: true, // Necesario para Codespaces
    port: 3000,
    strictPort: true
  }
});