import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Legal-Advise-/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})