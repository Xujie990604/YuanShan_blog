/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-06 18:27:48
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\global\index.ts
 * @Description:
 */

import type { App } from 'vue'
import ElementPlus from './register-element'

// 引入 normalize CSS 文件
import 'normalize.css'
// 引入自定义 CSS 文件
import '../assets/CSS/index.scss'

export default function (app: App) {
  app.use(ElementPlus)
}
