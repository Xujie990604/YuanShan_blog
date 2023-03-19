/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-06 18:31:17
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \vue-ts\src\global\register-element.ts
 * @Description: 注册 Element 插件(如果是按需引入的话，代码量会比较大，直接放在 main.ts 入口文件里不太好)
 */

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 如果是按需引入的话，导出的不是一个对象，应该是一个函数
// 函数内对所需组件进行循环全局注册
export default ElementPlus
