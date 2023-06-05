// 响应数据的基础类型
export { IDataType } from '../type'

// 登录接口 request 类型
export interface IUserLoginData {
  name: string
  password: string
}

// 登录接口 response data 单个数据的类型
export interface IUserLoginResponseData {
  id: number
  name: string
  password: string
  nickname: string
}
