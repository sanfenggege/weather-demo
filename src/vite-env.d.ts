/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HEWEATHER_TOKEN: string
  readonly VITE_HEWEATHER_API_HOST: string
  // 其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}