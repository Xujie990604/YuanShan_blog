/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-19 17:57:52
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\main.ts
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import registerApp from './global/index'

const app = createApp(App)
const pinia = createPinia()

// 一些第三方插件的注册统一使用 registerApp 函数
registerApp(app)

app.use(pinia)
app.use(router)

app.mount('#app')
