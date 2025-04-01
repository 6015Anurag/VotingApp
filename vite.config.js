import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Anything that starts with `/api` goes to the backend
        target: 'https://dvapp-backend-rrb4.onrender.com',
        changeOrigin: true,
        secure: false, // Ignore self-signed SSL errors (optional)
        rewrite: (path) => path.replace(/^\/api/, '') // Remove `/api` before forwarding
      }
    }
  }
})
