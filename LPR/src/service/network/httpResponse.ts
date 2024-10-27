import {showToast} from 'vant';

/**
 * 处理接口中 HTTP 错误码
 * @param code http 状态码
 */
export function handleHTTPCode(code: number, toast: boolean): void {
  if (!toast) return
  switch (code) {
    case 404:
      showToast('404 无响应')
      break
    default:
      showToast('其他 HTTP 错误')
  }
}

/**
 * 处理接口中业务错误码
 * @param code http 状态码
 */
export function handleBusinessCode(code: number, toast: boolean): void {
  if (!toast) return
  switch (code) {
    case 200:
      break
    case 1001:
      showToast({
        message: 'Token 失效',
        position: 'bottom',
        duration: 2000
      })
      break
    default:
      showToast({
        message: '其他业务码错误',
        position: 'bottom',
        duration: 2000
      })
  }
}
