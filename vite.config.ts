import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // o tu framework

export default defineConfig({
  plugins: [react()],
  base: './sky-view-reports/', // Cambia de '/' a './' para rutas relativas
  build: {
    outDir: 'dist'
  }
})