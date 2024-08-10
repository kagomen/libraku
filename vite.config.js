import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      injectRegister: 'auto',
      lang: 'ja',
      start_url: 'index.html',
      display: 'standalone',
      manifest: {
        name: 'リブラク',
        short_name: 'リブラク', // ホーム画面に追加した時に表示される名前
        description: '図書館ユーザーのための書籍検索アプリ',
        theme_color: '#16a34a',
        background_color: '#ffffff',
        // 各サイズごとのアイコンは下記で生成する。
        // https://www.pwabuilder.com/imageGenerator
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
        // PWACompatを自動的に注入する設定
        experimental: {
          includeAllowlist: [/^https:\/\/cdn\.jsdelivr\.net\/npm\/pwacompat/],
        },
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
