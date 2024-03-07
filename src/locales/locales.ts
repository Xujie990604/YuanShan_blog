import { createI18n } from 'vue-i18n'
import zh from './lang/zh.json'
import en from './lang/en.json'

const messages = {
  zh,
  en,
}

export default createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true, // 全局注册 $t 方法
  messages,
})
