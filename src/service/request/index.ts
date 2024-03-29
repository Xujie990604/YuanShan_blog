import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  // axios 实例
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    // 生成 axios 实例
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      res => {
        return res
      },
      err => {
        return err
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      res => {
        const data = res.data
        // TODO: 根据响应结果中的错误码进行弹窗提示
        return data
      },
      err => {
        // TODO: 根据 HTTP 结果码进行适配
        // 404 页面 500页面
        return err
      }
    )
  }

  // 发起网络请求
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        // 调用实例上的请求方法
        .request<any, T>(config)
        // 请求成功
        .then(res => {
          resolve(res)
        })
        // 请求失败
        .catch(err => {
          reject(err)
        })
    })
  }

  // get 类型的请求
  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post 类型的请求
  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete 类型的请求
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch 类型的请求
  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
