import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': {
        target: 'https://libraku-api.kagome.workers.dev',
        changeOrigin: true,
      },
      '/book': {
        target: 'https://libraku-api.kagome.workers.dev',
        changeOrigin: true,
      },
      '/send-email': {
        target: 'https://libraku-api.kagome.workers.dev',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
