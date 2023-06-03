import Request from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'

// 拥有指定配置项的 实例
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default request
