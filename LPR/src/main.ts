import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import registerApp from './global/global'

if (import.meta.env.VITE_APP_ISMOCK_API === '1') {
  import('./mock/mock-request/mock-request')
}

const app = createApp(App)

// 第三方插件的注册统一使用 registerApp 函数
registerApp(app)

app.use(createPinia())
app.use(router)
app.mount('#app')
