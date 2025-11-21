import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/QR-Code-Generator/',  // Repository name for GitHub Pages
  plugins: [react()],
})
