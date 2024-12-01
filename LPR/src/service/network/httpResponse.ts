import { showToast } from 'vant'
import locales from '../../locales/locales'
import { dsbridgeFuncSync } from '../../dsbridge/dsbridge'

/**
 * 处理接口中 HTTP 错误码
 * @param code http 状态码
 */
export function handleHTTPCode(code: number, toast: boolean): void {
  if (!toast) return
  let toastText = ''
  switch (true) {
    // NOTE: 如果有需要添加额外操作的错误码，自行添加 case 分支
    // case code === xxxx:
    //   ...... do something
    //   toastText = 'xxxxxx'
    // break;

    default:
      toastText =
        locales.global.t(`HTTP_errCode_${code}`) ||
        locales.global.t('requestCommonError') + `(${code})`
  }

  showToast({
    message: toastText,
    position: 'bottom',
    duration: 2000,
  })
}

/**
 * 处理接口中云端业务错误码
 * @param code http 状态码
 */
export function handleBusinessCode(code: number, toast: boolean): void {
  if (!toast) return
  let toastText = ''
  switch (true) {
    // NOTE: 如果有需要添加额外操作的错误码，自行添加 case 分支
    // case code === xxxx:
    //   ...... do something
    //   toastText = 'xxxxxx'
    // break;

    // Token 认证失败、过期
    case code === 1001 || code === 1002:
      localStorage.clear()
      toastText = locales.global.t(`WEB_errCode_${code}`)
      dsbridgeFuncSync.backTo()
      break
    default:
      toastText =
        locales.global.t(`WEB_errCode_${code}`) ||
        locales.global.t('requestCommonError') + `(${code})`
  }
  showToast({
    message: toastText,
    position: 'bottom',
    duration: 2000,
  })
}

/**
 * 处理接口中设备侧业务错误码
 * @param code http 状态码
 */
export function handleDeviceBusinessCode(code: number, toast: boolean): void {
  if (!toast) return
  let toastText = ''
  switch (true) {
    // NOTE: 如果有需要添加额外操作的错误码，自行添加 case 分支
    // case code === xxxx:
    //   ...... do something
    //   toastText = 'xxxxxx'
    // break;

    default:
      toastText =
        locales.global.t(`LAPI_errCode_${code}`) ||
        locales.global.t('requestCommonError') + `(${code})`
  }

  showToast({
    message: toastText,
    position: 'bottom',
    duration: 2000,
  })
}
