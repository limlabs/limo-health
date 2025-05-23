import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react(), TanStackRouterVite({ autoCodeSplitting: true })],
  css: {
    postcss: './postcss.config.js',
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
})
