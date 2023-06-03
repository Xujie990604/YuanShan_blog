import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite 的 eslint 插件(在 dev || build 时自动检测指定文件的 eslint 问题)
import eslintPlugin from 'vite-plugin-eslint'
// Vite 的 stylelint 插件
import vitePluginStylelint from 'vite-plugin-stylelint'
// PostCss 插件，用来自动给 CSS 属性添加前缀
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'], // linting 时要包含的单个文件或文件数组。
      lintOnStart: false, // 项目启动时检查所有匹配的文件，太慢了，谨慎打开。
    }),
    vitePluginStylelint({ fix: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
})
