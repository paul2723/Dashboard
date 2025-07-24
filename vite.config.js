import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        const nojekyllPath = resolve(__dirname, 'dist', '.nojekyll')
        fs.writeFileSync(nojekyllPath, '')
        
        // Añadir CNAME si usas dominio personalizado
        const cnamePath = resolve(__dirname, 'dist', 'CNAME')
        if(fs.existsSync('CNAME') && !fs.existsSync(cnamePath)) {
          fs.copyFileSync('CNAME', cnamePath)
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
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})