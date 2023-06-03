import request from '@/service/index'
import API from '@/constant/request'
import type { IUserInfo } from './type'
// 获取用户信息
export function getUserInfo() {
  return request.get<IUserInfo[]>({
    url: API.getUserInfo,
  })
}
