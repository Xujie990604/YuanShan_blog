import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import type { IResponseType, UNVRequestInterceptors } from './types'
import type { IRequestConfig } from '../request/type'
import { handleHTTPCode, handleBusinessCode } from './httpResponse'

import { showLoadingToast, closeToast } from 'vant';

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
  request<T>(config: AxiosRequestConfig, { loading = true, toast = true }: IRequestConfig = {}) {
    if(loading) {
      showLoadingToast({
        message: '加载中...'
      })
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        // 调用实例上的请求方法
        .request<any, IResponseType<T>>(config)
        // 请求成功
        .then(res => {
          closeToast()
          if (res.code === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
            handleBusinessCode(res.code, toast)
          }
        })
        // 请求失败
        .catch(err => {
          handleHTTPCode(err.status, toast)
          reject(err)
        })
        .finally(() => {
          closeToast()
        })
    })
  }

  // get 类型的请求
  get<T = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' }, requestConfig)
  }

  // post 类型的请求
  post<T = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' }, requestConfig)
  }

  // delete 类型的请求
  delete<T = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' }, requestConfig)
  }

  // patch 类型的请求
  patch<T = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T>({ ...config, method: 'PATCH' }, requestConfig)
  }
}

export default UNVRequest
