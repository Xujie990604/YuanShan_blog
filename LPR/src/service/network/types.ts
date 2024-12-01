export enum UNVRequestTypeEnum {
  CLOUD = 'cloud',
  LAPI = 'lapi',
  P2P = 'p2p',
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
  UNVRequestType: UNVRequestTypeEnum
}

import type { IResponseType, IP2PResponseType } from '../request/type'

/**
 * 类型谓词函数，用于确定返回值是 IResponseType 类型
 */
export function isCloudRequest(arg: any, type: UNVRequestTypeEnum): arg is IResponseType {
  return arg && type === UNVRequestTypeEnum.CLOUD
}

/**
 * 类型谓词函数，用于确定返回值是 IP2PResponseType 类型
 */
export function isP2PRequest(arg: any, type: UNVRequestTypeEnum): arg is IP2PResponseType {
  return arg && type === UNVRequestTypeEnum.P2P
}
