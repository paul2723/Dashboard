import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Importa el plugin VitePWA

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dashboard/", // Configura la base de la URL
  plugins: [
    react(),
    VitePWA({ // Configura el plugin VitePWA
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // Incluye todos los activos necesarios, incluyendo los favicons específicos
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon-32x32.png', 'favicon-16x16.png', 'sol.png'], // Añade tu icono de sol aquí
      manifest: { // Define el manifest de la PWA
        id: '/dashboard/',
        name: 'Clima', // CAMBIADO: Nombre de la aplicación a "Clima"
        short_name: 'Clima', // CAMBIADO: Nombre corto a "Clima"
        description: 'Proyecto 04 - dashboard del clima desarrollado con React y MUI',
        theme_color: '#D3D1D1',
        start_url: '/dashboard/', // Asegura que la URL de inicio coincida con la base
        icons: [
          {
            src: 'sol2.png', // CAMBIADO: Ruta de icono para un sol
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'sol2.png', // CAMBIADO: Ruta de icono para un sol
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: "sol2.png", // CAMBIADO: Ruta de icono maskable para un sol
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "sol2.png", // CAMBIADO: Ruta de icono maskable para un sol
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
        ]
      },
      workbox: { // Configuración de Workbox para runtime caching
        runtimeCaching: [
          {
            // Intercepta todas las peticiones a la API de Open-Meteo
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*$/,
            handler: 'NetworkFirst', // Estrategia de caché: intentar red primero, luego caché
            options: {
              cacheName: 'open-meteo-cache', // Nombre del caché
              expiration: {
                maxEntries: 10, // Máximo de 10 entradas en caché
                maxAgeSeconds: 60 * 60 * 24, // Las entradas expiran después de 1 día (60 segundos * 60 minutos * 24 horas)
              },
              cacheableResponse: {
                statuses: [0, 200], // Almacena en caché respuestas con estado 0 (para CORS) y 200 (éxito)
              }
            }
          }
        ]
      }
    })
  ],
});