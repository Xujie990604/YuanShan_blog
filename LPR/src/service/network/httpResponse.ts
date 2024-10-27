/**
 * 处理接口中 HTTP 错误码
 * @param code http 状态码
 */
export function handleHTTPCode(code: number): void {
  switch (code) {
    case 200:
      console.log('接口请求成功')
      break
    default:
      console.log('接口请求失败')
  }
}

/**
 * 处理接口中业务错误码
 * @param code http 状态码
 */
export function handleBusinessCode(code: number): void {
  switch (code) {
    case 200:
      console.log('业务处理成功')
      break
    default:
      console.log('业务处理失败')
  }
}
