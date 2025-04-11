import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '^/api/.*': {
          target: env.VITE_HEWEATHER_API_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        }
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
})