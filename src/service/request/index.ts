/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-28 19:08:27
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\service\request\index.ts
 * @Description: 导出自定义的 axios 请求类
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
// 导入自定义的接口类型
import type { RequestConfig, RequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.d'

// 默认是否显示 loading
const DEFAULT_LOADING = true
class Request {
  // axios 的实例
  instance: AxiosInstance
  // 拦截器
  interceptors?: RequestInterceptors
  // loading 实例
  loading?: LoadingInstance
  // 默认需要 loading
  showLoading: boolean = DEFAULT_LOADING

  constructor(config: RequestConfig) {
    // 生成 axios 实例
    this.instance = axios.create(config)
    // 保存传进来的拦截器
    this.interceptors = config.interceptors

    // 使用实例创建时传入的请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 使用实例创建时传入的响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有实例上都会有的请求拦截器
    this.instance.interceptors.request.use(
      (res) => {
        // 当确定需要 loading 时才执行
        if (this.showLoading) {
          //  发起请求时，展示 loading
          this.loading = ElLoading.service({
            lock: true,
            text: '客官请稍后......',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        console.log('所有实例上都会有的请求成功拦截器')
        return res
      },
      (err) => {
        console.log('所有实例上都会有的请求失败拦截器')
        return err
      }
    )
    // 所有实例上都会有的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例上都会有的响应成功拦截器')

        // 关闭 loading
        this.loading?.close()

        const data = res.data
        // TODO: 根据响应结果中的错误码进行弹窗提示
        return data
      },
      (err) => {
        console.log('所有实例上都会有的响应失败拦截器')
        // 关闭 loading
        this.loading?.close()
        // TODO: 根据 HTTP 结果码进行动作适配
        // 404 专属页面  500 专属页面
        return err
      }
    )
  }

  // 发起网络请求的方法
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 如果单独的请求上有定义请求拦截器的话，调用拦截器方法
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2. 用户传的 showLoading 和默认值不一致时，将本次请求的 showLoading 修改为用户指定的值
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = !DEFAULT_LOADING
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 如果单独的请求上有定义响应拦截器的话，调用拦截器方法
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2. 将 showLoading 重新设置为默认值，避免影响下一次请求
          this.showLoading = DEFAULT_LOADING
          // 3. 将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          // 1. 将 showLoading 重新设置为默认值，避免影响下一次请求
          this.showLoading = DEFAULT_LOADING
          // 2. 将错误结果返回出去
          reject(err)
        })
    })
  }

  // get 类型的请求
  get<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  // post 类型的请求
  post<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  // delete 类型的请求
  delete<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  // patch 类型的请求
  patch<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
