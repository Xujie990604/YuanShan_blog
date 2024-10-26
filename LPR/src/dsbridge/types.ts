
/**
 * dsbridge 的调用方式
 */
export enum callNativeTypeEnum {
  callNativeDoFuncAsync = 'callNativeDoFuncAsync',
  callNativeDoFuncSync = 'callNativeDoFuncSync'
}

/**
 * 从 APP 获取的启动参数
 */
export interface IGetAllInfoResult {
  ucsToken: string,
  serverAddress: serverAddressEnum,
  curLan: lanEnum,
  defaultLan: lanEnum,
  statusBarHeight: number,
  hasHomeIndicator: hasHomeIndicatorEnum,
  AppType: AppTypeEnum
}

/**
 * 服务器地址
 */
export enum serverAddressEnum {
  DOMESTIC_UCS = "https://ezcloud.uniview.com", // 国内UCS服务器地址
  OVERSEAS_UCS= "https://ap.ezcloud.uniview.com", // 海外UCS服务器地址
  DOMESTIC_IOT= "https://eziot.uniview.com", // 国内IOT服务器地址
  OVERSEAS_IOT= "https://ap-eziot.uniview.com", // 海外IOT服务器地址
}

/**
 * 系统语言
 */
//  NOTE: 当前项目支持的所有语言类型
export enum lanEnum  {
  ZH = "1", // 中文
  EN = "2", // 英文
JAP = "3", // 英文
}

/**
 * 语言类型(用于设置 i18n, 需要和 i18n message 的 key 值保持一致)
 */
// NOTE: TS 的枚举属性名不支持计算属性，所以使用对象字面量来实现
export const langTypeEnum  = {
  [lanEnum.ZH]:  "zh",
  [lanEnum.EN]:  "en",
  [lanEnum.JAP]:  "jap",
}

/**
 * APP 类型
 */
export enum AppTypeEnum  {
  EZVIEW = "0",
  EZLIVE = "1", // 宇视云(国内及海外)
  UNIARCH = "2", // uniarch 和 uniwiz
  NONEBRANCH = "3", // 宇视云白牌(国内及海外)
  EZLIVE_PRO = "6", // 宇视云Pro(国内及海外)
}

/**
 * 底部安全区
 */
export enum hasHomeIndicatorEnum  {
  NO = "0",
  YES = "1",
}
