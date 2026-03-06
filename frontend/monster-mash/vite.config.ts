import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/claude': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/claude/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('x-api-key', env.CLAUDE_API_KEY ?? '')
              proxyReq.setHeader('anthropic-version', '2023-06-01')
              // Strip browser headers so Anthropic treats this as a server request
              proxyReq.removeHeader('origin')
              proxyReq.removeHeader('referer')
            })
          },
        },
        '/api/tmdb': {
          target: 'https://api.themoviedb.org/3',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tmdb/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, _req) => {
              // Inject api_key as query parameter
              const url = new URL(proxyReq.path, 'http://localhost')
              url.searchParams.set('api_key', env.TMDB_API_KEY ?? '')
              proxyReq.path = url.pathname + url.search
            })
          },
        },
      },
    },
  }
})
