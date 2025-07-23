import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Dashboard/', // Importante: debe coincidir con tu repo
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})