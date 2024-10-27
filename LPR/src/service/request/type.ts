/**
 * 接口请求通用参数
 * @interface loading 是否开启 loading
 * @interface toast 是否错误码提示
 */
export interface IRequestConfig {
  loading?: boolean
  toast?: boolean
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
