/**
 * 通用接口返回格式
 */
export interface IResponseType<T = any> {
  data: T
  code: number
  message: string
}

import type { CreateAxiosDefaults, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 创建 service 实例的入参
 */
export interface UNVRequestInterceptors extends CreateAxiosDefaults {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
