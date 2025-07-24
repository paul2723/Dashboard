import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs' // Añade esta importación
import path from 'path' // Añade esta importación

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        const nojekyllPath = path.join(__dirname, 'dist', '.nojekyll')
        if (!fs.existsSync(nojekyllPath)) {
          fs.writeFileSync(nojekyllPath, '')
        }
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})