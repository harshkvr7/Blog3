import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://api:3000/',  // Docker service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
