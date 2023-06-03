import type { App } from 'vue'

export default function (app: App) {
  app.config.errorHandler = (err, vm, info) => {
    console.log('全局的路由错误处理器')
    console.log(err)
    console.log(vm)
    console.log(info)
  }
}
