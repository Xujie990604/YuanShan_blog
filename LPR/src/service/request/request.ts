import type { IRequestConfig, IUserLoginRequestData, IUserLoginResponseData } from './type'
import { normalNetwork } from '../service'
import api from '../../constant/api'

/**
 * 用户登录接口
 * @param data
 */
export function userLoginRequest(data: IUserLoginRequestData, requestConfig?: IRequestConfig) {
  return new Promise<IUserLoginResponseData>((resolve, reject) => {
    normalNetwork
      .post<IUserLoginResponseData>(
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
