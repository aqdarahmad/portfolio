import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // In development, forward chat requests to the Express server (npm run dev:api).
  server: { proxy: { '/api': 'http://localhost:4173' } },
  preview: { allowedHosts: true },
})
