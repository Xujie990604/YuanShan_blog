import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import type { IResponseType, UNVRequestInterceptors } from './types'
import type { IRequestConfig } from '../request/type'

class UNVRequest {
  // axios 实例
  instance: AxiosInstance

  // 配置参数
  requestConfig: IRequestConfig = { loading: true, toast: true }

  // config 类型切换为 CreateAxiosDefaults 的派生类

  constructor(config: UNVRequestInterceptors) {
    // 生成 axios 实例
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      config.requestInterceptor,
      config.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      config.responseInterceptor,
      config.responseInterceptorCatch
    )
  }

  // config 的类型切换为 AxiosRequestConfig 的派生类
  // 发起网络请求
  request<T>(config: AxiosRequestConfig) {
    return new Promise<T>((resolve, reject) => {
      this.instance
        // 调用实例上的请求方法
        .request<any, IResponseType<T>>(config)
        // 请求成功
        .then(res => {
          console.log(res)
          resolve(res.data)
        })
        // 请求失败
        .catch(err => {
          reject(err)
        })
    })
  }

  // get 类型的请求
  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post 类型的请求
  post<T = any>(
    config: AxiosRequestConfig,
    requestConfig: IRequestConfig = { loading: true, toast: true }
  ) {
    this.requestConfig = requestConfig
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete 类型的请求
  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch 类型的请求
  patch<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default UNVRequest
