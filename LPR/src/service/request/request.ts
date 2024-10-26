import type { IResponseType, IUserLoginRequestData, IUserLoginResponseData } from './type'
import { normalNetwork } from '../service'
import api from '../../constant/api'

/**
 * 用户登录接口
 * @param data
 */
export function userLoginRequest(data: IUserLoginRequestData) {
  return new Promise<IResponseType<IUserLoginResponseData>>((resolve, reject) => {
    normalNetwork
      .post({
        url: api.login,
        data,
      })
      .then(result => {
        resolve(result as IResponseType<IUserLoginResponseData>)
      })
      .catch(err => {
        reject(err)
      })
  })
}
