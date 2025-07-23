import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Dashboard/', // Asegúrate que coincida con tu repositorio
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})