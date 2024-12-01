import type { App } from 'vue'

// 用于为应用内抛出的未捕获错误指定一个全局处理函数。
export default function (app: App) {
  app.config.errorHandler = (err, vm, info) => {
    console.log('自定义应用的全局错误处理器', {
      err,
      vm,
      info,
    })
  }
}
