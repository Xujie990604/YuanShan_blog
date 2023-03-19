import request from '../index'
import type { accountType, IDataType, IAccountLoginResult } from './type'

// 枚举类型承载页面中使用的接口
enum LoginURL {
  accountLogin = '/login',
  loginUserInfo = '/users/', // 用法  /users/{$id}
  menuInfo = '/role/' // 用法 /role/{$id}/menu
}

// 登录请求接口
export function accountLoginRequest(account: accountType) {
  return request.post<IDataType<IAccountLoginResult>>({
    url: LoginURL.accountLogin,
    data: account
  })
}

// 登录之后根据用户 ID 请求用户信息
export function requestUserInfoById(id: number) {
  // 因为用户信息接口返回值太多种了，定义不起。就不定义了
  return request.get<IDataType>({
    url: LoginURL.loginUserInfo + id,
    showLoading: false
  })
}

// 根据用户 ID 请求菜单
export function requestMenuInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginURL.menuInfo + id + '/menu',
    showLoading: false
  })
}
