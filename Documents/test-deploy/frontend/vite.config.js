import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {
        target: 'https://vercel-test-five-peach.vercel.app',
        changeOrigin: true,
      },
    },
    watch:{
      usePolling: true,
    }
  },
  plugins: [react()],
})
