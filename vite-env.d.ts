/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string
    readonly VITE_API_DB_URL: string
    readonly JWT_SECRET: string
    readonly JWT_SIGNING_KEY  : string
    readonly JWT_ENCRYPTION_KEY: string
    readonly VITE_TOKEN: string
    readonly VITE_AUTH: string
    readonly VITE_X_API_KEY: string
    readonly VITE_JWT: string
    readonly VITE_API_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }