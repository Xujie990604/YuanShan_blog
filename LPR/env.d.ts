/// <reference types="vite/client" />

// NOTE: 给环境变量添加类型声明
interface ImportMetaEnv {
  readonly VITE_APP_ISMOCK_DSBRIDGE: string
  readonly VITE_APP_ISMOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// NOTE: 给 window 上添加变量类型声明
// interface Window {
// }
