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
 * 通用接口返回格式
 */
export interface IResponseType<T = any> {
  data: T
  code: number
  message: string
}

/**
 * P2P接口返回格式
 */
export interface IP2PResponseType<T = any> {
  ResponseURL: string
  ResponseCode: number
  ResponseString: string
  Data: T
  StatusCode: number
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

/**
 * 启动目标检索请求参数接口
 */

export interface IStartObjectSearchRequestData {
  Num: number
  QueryInfos: any[]
}

/**
 * 启动目标检索返回参数接口
 */

export interface IStartObjectSearchResponseData {
  SearchID: number
}

/**
 * 启动目标检索返回参数接口
 */

export interface ISearchProgressResponseData {
  Percent: number
}

/**
 * 查询信息返回参数接口
 */

export interface IMessageListResponseData {
  Total: number
  Num: number
  SmartObjectInfoList: IMessageInfo[]
}

export interface IMessageInfo {
  RecordID: number
  Type: number
  Time: number
  ChannelName: string
  ChannelID: number
  FullPicture: {
    URL: string
  }
  AlarmVideo: {
    URL: string
  }
}
