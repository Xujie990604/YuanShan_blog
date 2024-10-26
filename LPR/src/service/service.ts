import network from './network/network'
import { TIME_OUT } from './config'

// 一个指定实例

export const normalNetwork = new network({
  timeout: TIME_OUT,
  baseURL: 'https://ezcloud.uniview.com',
})
