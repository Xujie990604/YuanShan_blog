export interface IDataType<T = any> {
  code: number
  data: T
}

export interface IUserInfo {
  userId: number
  id: number
  title: string
  body: string
}
