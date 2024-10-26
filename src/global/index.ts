import type { App } from 'vue'
import ElementPlus from './register-element'
import globalCpts from './register-global-components'
import globalData from './register-global-data'
import routerErrorHandler from './router-error-handler'
import i18n from '../locales/locales'
import Vuetify from './register-vuetify'
import vuetifyIcon from './register-vuetify-icon'
import zhuge from './register-zhuge'

import '../assets/css/common.scss' // 引入全局 CSS 文件
import 'normalize.css' // 引入 格式化 CSS 文件
// NOTE: 不要使用，随意修改 rem 大小会导致 Vuetify 字体异常
// import './set-rem-size' // 设置 rem 大小
import '../assets/css/tailwindcss.css' // 引入 tailwindcss 样式文件

// NOTE:在 window 中添加一个属性(不推荐这种使用，仅用来测试 Vue template 中的访问范围)
window.info1 = '在 window 上的全局属性'

export default function (app: App) {
  app.use(ElementPlus) // 注册 Element 组件库
  // 注册全局组件
  globalCpts.forEach(cpt => {
    app.component(cpt.name, cpt.component)
  })
  // 注册全局变量
  globalData.forEach(data => {
    app.provide(data.key, data.value)
  })
  // 全局注册诸葛 io
  app.provide(zhuge.key, zhuge.value)
  routerErrorHandler(app) // 注册全局错误处理器
  app.config.globalProperties.$info2 = '在 Vue 实例上的全局属性' // 注册全局的变量(不推荐在 Vue3 的选项式中使用，仅是作为演示用)
  app.use(i18n) // 注册 i8n 实例
  app.use(Vuetify) // 注册 Vuetify
  app.use(vuetifyIcon) // 注册 Vuetify 图标
}
