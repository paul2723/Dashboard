import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sky-view-reports/', // Cambiar de /Dashboard/ a /sky-view-reports/
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
