import network from './network/network'
import { TIME_OUT } from './config'
import { UNVRequestTypeEnum } from './network/types'

// 一个指定实例
export const normalNetwork = new network({
  timeout: TIME_OUT,
  baseURL: 'https://ezcloud.uniview.com',
  UNVRequestType: UNVRequestTypeEnum.CLOUD,
  requestInterceptor(config) {
    return config
  },
  requestInterceptorCatch(err) {
    return Promise.reject(err)
  },
  responseInterceptor(res) {
    return res.data
  },
  responseInterceptorCatch(err) {
    return Promise.reject(err)
  },
})

/**
 * P2P调用设备接口
 */
export const P2PNetwork = new network({
  timeout: TIME_OUT,
  UNVRequestType: UNVRequestTypeEnum.P2P,
  headers: {
    'Content-Type': 'application/json',
  },
  requestInterceptor(config) {
    return config
  },
  requestInterceptorCatch(err) {
    return Promise.reject(err)
  },
  responseInterceptor(res) {
    return res.data.Response
  },
  responseInterceptorCatch(err) {
    return Promise.reject(err)
  },
})
