import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { leoverseDropsPlugin } from './vite.drops.js'
import { leoverseApiPlugin } from './vite.api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    leoverseApiPlugin(),
    leoverseDropsPlugin(),
  ],
  server: {
    host: true,
    port: 5173,
    cors: true,
    watch: {
      ignored: [
        '**/data/**',
        '**/data/ecommerce.db**',
        '**/*.db',
        '**/*.db-wal',
        '**/*.db-shm',
        '**/*.sqlite',
        '**/admin-dashboard/**',
        '**/public/media/drops/**',
        '**/public/content/**',
        '**/.gemini/**',
      ],
    },
  },
})
