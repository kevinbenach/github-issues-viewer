/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string
  // Add other VITE_ environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
