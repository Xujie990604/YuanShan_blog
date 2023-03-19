/*
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-12-28 19:19:05
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\service\request\config.ts
 * @Description:
 */

// 请求的基础路径
let BASE_URL = ''
// 超时时间
const TIME_OUT = 1000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/aaa/bbb'
}

export { BASE_URL, TIME_OUT }
