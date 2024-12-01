import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import registerApp from './global/global'

// NOTE: 根据环境变量进行接口 MOCK
if (import.meta.env.VITE_APP_ISMOCK_API === '1') {
  import('./mock/mock-request')
}

const app = createApp(App)

// 第三方插件的注册统一使用 registerApp 函数
registerApp(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
