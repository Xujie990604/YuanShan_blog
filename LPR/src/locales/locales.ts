import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'

// TODO：文件的引入需要改成懒加载
const messages = {
  zh,
  en,
}

export default createI18n({
  locale: '',
  fallbackLocale: 'en', // NOTE: 翻译缺失时的回退语言环境
  missing: () => '', // NOTE: 自定义不存在的字段返回值
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true, // 全局注册 $t 方法
  messages,
})
