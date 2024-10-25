/**
 * @file: 通用的工具函数文件
 */

/**
 * 获取 URL 中指定参数的值
 * @param url 完整的 URL 字符串
 * @param variable 需要获取的变量名称
 */
export function getQueryVariable(url: string, variable: string) {
  const query = url.split("?")[1];

  if (typeof query !== "undefined") {
    const vars = query.split("&");

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");

      if (pair[0] === variable) return pair[1];
    }
  }
  return undefined;
}

/**
 * @description: 获取 URL 中的域名
 * @param {String} url 完整的 URL 字符串
 * @returns string | undefined
 */
export function getDomainFromUrl(url) {
  const result = url.match(/^(https?:\/\/[^/]+)/i);
  if (result) {
    return result[1];
  } else {
    return undefined;
  }
}

/**
 * @description: 在域名前拼接 https://
 * @param {String} serverAddress
 */
export function ensureHttpsPrefix(serverAddress) {
  // 检查字符串是否以 'https://' 开头
  if (serverAddress.startsWith("https://")) {
    return serverAddress;
  } else {
    return "https://" + serverAddress;
  }
}

/**
 * 节流包装函数
 * @param {function} fn 被包装的函数
 * @param {number} [delay] 定时器延时时间
 * @returns
 */
export function throttle(fn, delay = 200) {
  let timer = null;
  return function () {
    const args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}

/**
 * 防抖包装函数
 * @param {function} fn 被包装的函数
 * @param {number} [delay] 定时器延时时间
 * @returns
 */
export function debounce(fn, delay = 200) {
  let timer = null;
  return function () {
    const self = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  };
}
