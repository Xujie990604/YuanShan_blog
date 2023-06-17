import type { App } from 'vue'
import ElementPlus from './register-element'
import globalCpts from './register-global-components'
import globalData from './register-global-data'
import routerErrorHandler from './router-error-handler'
import ElementPlusIconsVue from './register-element-icon'

// 引入全局 CSS 文件
import '../assets/css/common.scss'
// 引入 格式化 CSS 文件
import 'normalize.css'

// 在 window 中添加一个属性(不推荐这种使用，仅用来测试 Vue template 中的访问范围)
window.info1 = '在 window 上的全局属性'

export default function (app: App) {
  // 1. 注册 Element 组件库
  app.use(ElementPlus)
  // 2. 注册全局组件
  globalCpts.forEach(cpt => {
    app.component(cpt.name, cpt.component)
  })
  // 3. 注册全局变量
  globalData.forEach(data => {
    app.provide(data.key, data.value)
  })
  // 4.注册全局错误处理器
  routerErrorHandler(app)
  // 5. 注册全局的变量(不推荐在 Vue3 的选项式中使用，仅是作为演示用)
  app.config.globalProperties.$info2 = '在 Vue 实例上的全局属性'
  // 6. 注册全局的 Element 图标
  Object.keys(ElementPlusIconsVue).forEach(key => {
    app.component(key, ElementPlusIconsVue[key])
  })
}
