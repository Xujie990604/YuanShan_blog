import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  UNVRequestTypeEnum,
  type UNVRequestInterceptors,
  isCloudRequest,
  isP2PRequest,
} from './types'
import type { IRequestConfig } from '../request/type'
import { handleHTTPCode, handleBusinessCode, handleDeviceBusinessCode } from './httpResponse'
import { showToast } from 'vant'
import { md5 } from 'js-md5'
import { useDeviceInfoStore } from '../../stores/filter-condition/filter-condition'
const deviceInfoStore = useDeviceInfoStore()
import { dsbridgeFuncSync } from '../../dsbridge/dsbridge'
import locales from '../../locales/locales'

class UNVRequest {
  // axios 实例
  instance: AxiosInstance

  // 配置参数
  requestConfig: IRequestConfig = { loading: true, toast: true }

  // 接口类型
  UNVRequestType: UNVRequestTypeEnum

  // config 类型切换为 CreateAxiosDefaults 的派生类

  constructor(config: UNVRequestInterceptors) {
    // 生成 axios 实例
    this.instance = axios.create(config)

    this.UNVRequestType = config.UNVRequestType

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
  request<T, D>(config: AxiosRequestConfig, { loading = true, toast = true }: IRequestConfig = {}) {
    if (loading) {
      dsbridgeFuncSync.showLoading()
    }

    if (this.UNVRequestType === UNVRequestTypeEnum.P2P) {
      const devID = deviceInfoStore.currentSelectDeviceInfo!.devID
      const { username, ip, port, deviceStatus } = dsbridgeFuncSync.getDeviceP2PInfo(devID)
      const devPwd = dsbridgeFuncSync.updatePWD(devID)
      if (deviceStatus === '0') {
        showToast({
          message: locales.global.t('deViceOfflineTip'),
          position: 'bottom',
          duration: 2000,
        })
        return Promise.reject('')
      }
      config = {
        ...config,
        url: `http://${username}:${md5(devPwd)}@${ip}:${port}${config.url}`,
      }
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        // 调用实例上的请求方法
        .request<T, D>(config)
        // 请求成功
        .then(res => {
          if (isCloudRequest(res, this.UNVRequestType)) {
            if (res.code === 200) {
              resolve(res.data)
            } else {
              reject(res.data)
              handleBusinessCode(res.code, toast)
            }
          } else if (isP2PRequest(res, this.UNVRequestType)) {
            if (res.ResponseCode === 0) {
              resolve(res.Data)
            } else {
              reject(res.Data)
              handleDeviceBusinessCode(res.ResponseCode, toast)
            }
          }
        })
        // 请求失败
        .catch(err => {
          handleHTTPCode(err.status, toast)
          reject(err)
        })
        .finally(() => {
          dsbridgeFuncSync.dismiss()
        })
    })
  }

  // get 类型的请求
  get<T = any, D = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T, D>({ ...config, method: 'GET' }, requestConfig)
  }

  // post 类型的请求
  post<T = any, D = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T, D>({ ...config, method: 'POST' }, requestConfig)
  }

  // delete 类型的请求
  delete<T = any, D = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T, D>({ ...config, method: 'DELETE' }, requestConfig)
  }

  // put 类型的请求
  put<T = any, D = any>(config: AxiosRequestConfig, requestConfig?: IRequestConfig) {
    return this.request<T, D>({ ...config, method: 'PUT' }, requestConfig)
  }
}

export default UNVRequest
