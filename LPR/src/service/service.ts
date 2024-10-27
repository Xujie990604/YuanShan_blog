import network from './network/network'
import { TIME_OUT } from './config'
import { handleHTTPCode, handleBusinessCode } from './network/httpResponse'

// 一个指定实例
export const normalNetwork = new network({
  timeout: TIME_OUT,
  baseURL: 'https://ezcloud.uniview.com',
  requestInterceptor: config => {
    return config
  },
  requestInterceptorCatch: err => {
    return err
  },
  responseInterceptor: res => {
    console.log(res)
    handleBusinessCode(res.data.code)
    return res.data
  },
  responseInterceptorCatch: err => {
    handleHTTPCode(err)
    return err
  },
})
