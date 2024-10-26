export interface IResponseType<T = any> {
  data: T
  code: number
  message: string
}

/**
 * 用户登录请求参数接口
 */
export interface IUserLoginRequestData {
  name: string
  password: string
}

/**
 * 用户登录返回参数接口
 */
export interface IUserLoginResponseData {
  id: number
  name: string
  userType: number
}
