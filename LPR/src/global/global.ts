import type { App } from 'vue'
import i18n from '../locales/locales';

import '../assets/css/common.css'  // 导入自定义 CSS 文件
import '../assets/css/normalize.css' // 导入样式重置 CSS 文件

import routerErrorHandler from './register-error-handler'
import vantComponentList from './register-vant';
import globalComponent from './register-global-component';
import globalData from './register-global-data';


export default function(app: App) {
  app.use(i18n) // 注册 i18n 实例

  routerErrorHandler(app) // 注册全局错误处理器

  // 全局注册基本组件
  globalComponent.forEach((cpt) => {
    app.component(cpt.componentName, cpt.component)
  })

  // 全局注册变量
  globalData.forEach((data) => {
    app.provide(data.key, data.value)
  })

  // 全局注册 Vant
  vantComponentList.forEach((vantComponent) => {
    app.use(vantComponent)
  })
}
