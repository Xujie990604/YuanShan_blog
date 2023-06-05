import request from '@/service/index'
import API from '@/constant/request'
import type { IDataType, IUserLoginResponseData, IUserLoginData } from './type'

// 用户登录请求的 data 类型
// 用户登录的接口请求
export function userLogin(data: IUserLoginData) {
  return request.post<IDataType<IUserLoginResponseData[]>>({
    url: API.login,
    data,
  })
}
