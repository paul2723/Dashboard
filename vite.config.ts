import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Para desarrollo local usa './'
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})