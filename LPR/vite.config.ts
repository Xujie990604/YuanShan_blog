import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';  // 会自动导入对应的 Vant APi 以及样式
import Components from 'unplugin-vue-components/vite'; //会解析模板并自动注册对应的组件
import { VantResolver, VantImports } from '@vant/auto-import-resolver'; //会自动引入对应的组件样式。
import { visualizer } from 'rollup-plugin-visualizer'

// TODO： 更多 Vite 插件的使用

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      imports: [VantImports(), "vue", "vue-router", "pinia"],
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0', // 监听所有地址
  }
})
