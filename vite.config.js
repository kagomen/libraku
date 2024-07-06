import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const serverUrl = process.env.VITE_SERVER_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': {
        target: serverUrl,
        changeOrigin: true,
      },
      '/book': {
        target: serverUrl,
        changeOrigin: true,
      },
      '/send-email': {
        target: serverUrl,
        changeOrigin: true,
      },
      '/turnstile': {
        target: serverUrl,
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
