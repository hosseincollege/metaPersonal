import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  define: {
    'import.meta.env.VITE_API_BASE': JSON.stringify(process.env.VITE_API_BASE || `${process.env.VITE_BASE_PATH || '/'}api`),
  },
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: true,       // اختیاری: auto open browser
    proxy: {
      '/api': 'http://127.0.0.1:3017',
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 5273,
    strictPort: true,
    allowedHosts: ['bina-pardazesh.ir', 'www.bina-pardazesh.ir'],
  },
})
