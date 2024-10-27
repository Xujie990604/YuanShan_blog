import {
  serverAddressEnum,
  lanEnum,
  AppTypeEnum,
  hasHomeIndicatorEnum,
} from '../../dsbridge//types'

export interface IAPPInfoStore {
  ucsToken: string
  serverAddress: serverAddressEnum
  curLan: lanEnum
  curLanType: string
  defaultLan: lanEnum
  statusBarHeight: number
  hasHomeIndicator: hasHomeIndicatorEnum
  AppType: AppTypeEnum
}

export interface ISetAPPInfoStore {
  ucsToken?: string
  serverAddress?: serverAddressEnum
  curLan?: lanEnum
  curLanType?: string
  defaultLan?: lanEnum
  statusBarHeight?: number
  hasHomeIndicator?: hasHomeIndicatorEnum
  AppType?: AppTypeEnum
}
