import type {
  IRequestConfig,
  IResponseType,
  IP2PResponseType,
  IUserLoginRequestData,
  IUserLoginResponseData,
} from './type'
import { normalNetwork, P2PNetwork } from '../service'
import api from '../../constant/api'

/**
 * 用户登录接口(云接口调用示例)
 * @param data
 */
export function userLoginRequest(data: IUserLoginRequestData, requestConfig?: IRequestConfig) {
  return new Promise<IUserLoginResponseData>((resolve, reject) => {
    normalNetwork
      .post<IUserLoginResponseData, IResponseType<IUserLoginResponseData>>(
        {
          url: api.login,
          data,
        },
        requestConfig
      )
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

import type { IStartObjectSearchRequestData, IStartObjectSearchResponseData } from './type'
/**
 * 开始目标检索
 * @param data
 */
export function startObjectSearchRequest(
  data: IStartObjectSearchRequestData,
  requestConfig?: IRequestConfig
) {
  return new Promise<IStartObjectSearchResponseData>((resolve, reject) => {
    P2PNetwork.put<
      IStartObjectSearchResponseData,
      IP2PResponseType<IStartObjectSearchResponseData>
    >(
      {
        url: api.startObjectSearch,
        data,
      },
      requestConfig
    )
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

import type { ISearchProgressResponseData } from './type'

/**
 * 查询进度
 * @param data
 */
export function getSearchProgressRequest(searchID: number, requestConfig?: IRequestConfig) {
  let url = ''
  if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '1') {
    url = api.getSearchProgress
  } else {
    url = api.getSearchProgress.replace('<SearchID>', String(searchID))
  }
  return new Promise<ISearchProgressResponseData>((resolve, reject) => {
    P2PNetwork.get<ISearchProgressResponseData, IP2PResponseType<ISearchProgressResponseData>>(
      {
        url,
      },
      requestConfig
    )
      .then(result => {
        console.log(result)
        resolve(result)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

import type { IMessageListResponseData } from './type'

/**
 * 查询消息
 * @param data
 */
export function getMessageListRequest(
  searchID: number,
  Limit: number = 10,
  Offset: number,
  requestConfig?: IRequestConfig
) {
  let url = ''
  if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '1') {
    url = api.getMessageList
  } else {
    url = api.getMessageList
      .replace('<SearchID>', String(searchID))
      .replace('<Limit>', String(Limit))
      .replace('<Offset>', String(Offset))
  }
  return new Promise<IMessageListResponseData>((resolve, reject) => {
    P2PNetwork.get<IMessageListResponseData, IP2PResponseType<IMessageListResponseData>>(
      {
        url,
      },
      requestConfig
    )
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 停止任务
 * @param data
 */
export function stopSearchRequest(searchID: number, requestConfig?: IRequestConfig) {
  return new Promise((resolve, reject) => {
    P2PNetwork.delete(
      {
        url: api.stopSearch,
        data: {
          SearchID: searchID,
        },
      },
      requestConfig
    )
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  })
}
