import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
  },
  build: {
    outDir: './docs',
  },
  base: 'https://password-generator.kryota.dev/',
})
