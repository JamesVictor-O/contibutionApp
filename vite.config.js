import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@rainbow-me/rainbowkit']
    }
  },
  server: {
    headers: {
      'Content-Type': 'text/javascript'
    }
  },
  base: '/', 
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
