// api 返回的接口信息总格式
// data 会根据不同的接口有不同的数据所以使用泛型
// 默认类型为 any(有些情况接口数据特别复杂，懒得定义)
export interface IDataType<T = any> {
  code: number
  data: T
}

// 账号登录用户信息接口
export interface accountType {
  name: string
  password: string
}
// 账号登录返回信息的接口
export interface IAccountLoginResult {
  id: number
  name: string
  token: string
}
