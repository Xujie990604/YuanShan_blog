/**
 * @file: 通用的工具函数文件
 */

/**
 * 获取 URL 中指定参数的值
 * @param url 完整的 URL 字符串
 * @param variable 需要获取的变量名称
 */
export function getQueryVariable(url: string, variable: string) {
  const query = url.split('?')[1]

  if (typeof query !== 'undefined') {
    const vars = query.split('&')

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')

      if (pair[0] === variable) return pair[1]
    }
  }
  return undefined
}

/**
 * 获取 URL 中的域名
 * @param url 完整的 URL 字符串
 */
export function getDomainFromUrl(url: string) {
  const result = url.match(/^(https?:\/\/[^/]+)/i)
  if (result) {
    return result[1]
  } else {
    return undefined
  }
}

/**
 * 在域名前拼接 https://
 */
export function ensureHttpsPrefix(serverAddress: string) {
  // 检查字符串是否以 'https://' 开头
  if (serverAddress.startsWith('https://')) {
    return serverAddress
  } else {
    return 'https://' + serverAddress
  }
}

/**
 * 节流包装函数
 * @param fn 被包装的函数
 * @param delay 定时器延时时间
 */
export function throttle(fn: any, delay = 200) {
  let timer: number | null = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn(...args)
      }, delay)
    }
  }
}

/**
 * 防抖包装函数
 * @param fn 被包装的函数
 * @param  delay 定时器延时时间
 */
export function debounce(fn: any, delay = 200) {
  let timer: number | null = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn(...args)
    }, delay)
  }
}
