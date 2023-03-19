/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-01-12 20:09:40
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\service\request\type.ts
 * @Description: request 中定义的 TS 类型
 */
import type { AxiosRequestConfig } from 'axios'
// 定义的拦截器的类型
export interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (error: any) => any
}

// 扩充原有的 AxiosRequestConfig 类型,增加一个 拦截器类型的数据
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  showLoading?: boolean
}
