import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,       // ✅ پورت دلخواه
    open: true,       // اختیاری: auto open browser
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  }
})
