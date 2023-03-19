/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-28 19:05:31
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \vue-ts\src\service\index.ts
 * @Description: 导出 axios 实例(每个实例可以设置不同的 baseURl 和 timeout, 拦截器等属性)
 */
import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 在 localStore 中读取 Token
      const token = localCache.getCache('token')
      // config.headers 属性可能为空，使用短路语句排除掉 config.headers 为空的情况
      // 防止因为 config.headers 为 undefined 时程序报错
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('创建的实例请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('创建的实例请求失败的拦截')
      return err
    },
    responseInterceptor(config) {
      console.log('创建的实例响应成功的拦截')
      return config
    },
    responseInterceptorCatch(error) {
      console.log('创建的实例响应失败的拦截')
      return error
    }
  }
})

export default request
