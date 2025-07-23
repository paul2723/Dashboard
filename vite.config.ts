import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Configuración base dinámica (local vs producción)
  base: process.env.NODE_ENV === 'production' ? '/sky-view-reports/' : './',
  
  plugins: [react()],
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Opcional para depuración
    rollupOptions: {
      output: {
        // Optimización nombres de archivos
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true // Abre navegador automáticamente
  },
  
  // Resolución de alias (opcional)
  resolve: {
    alias: {
      '@': '/src' // Permite usar importaciones como '@/components'
    }
  }
});