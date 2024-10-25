import {createI18n} from 'vue-i18n';
import zh from './lang/zh';
import en from './lang/en';


// TODO：文件的引入需要改成懒加载
const messages = {
  zh,
  en
}

export default createI18n({
  locale: '',
  fallbackLocale: 'en',
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true, // 全局注册 $t 方法
  messages,
})
