import dsbridge from 'dsbridge'
import { callNativeTypeEnum, type IGetAllInfoResult } from './types'

// 异步的方式
export const dsbridgeFuncAsync = {
  jumpNativeGetData(configType, callback) {
    dsbridge.call(
      callNativeTypeEnum.callNativeDoFuncAsync,
      {
        type: 'jumpNativeGetData',
        configType,
      },
      function (result) {
        callback(JSON.parse(result))
      }
    )
  },
}

// 同步的方式
export const dsbridgeFuncSync = {
  // 获取所有基础信息
  getAllInfo(): IGetAllInfoResult {
    const result = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'getAllInfo',
    })
    return JSON.parse(result)
  },
  // 开启原生 loading
  showLoading() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'showLoading',
    })
  },
  // 关闭原生 loading
  dismiss() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'dismiss',
    })
  },
  // 返回上一个原生页面, 因为当前项目为 SPA 应用，所以该方法等价于关闭整个 WEB 应用
  backTo() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'backTo',
    })
  },
  // 原生toast组件提示
  webToast(text: string) {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'webToast',
      param: text,
    })
  },
}
