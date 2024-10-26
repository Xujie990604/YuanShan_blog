/**
 * @file: 对数据进行正则验证
 */

/**
 * 基础正则表达式枚举
 * @readonly
 * @enum  {RegExp}
 */
const regTypeEnum = {
  DOMESTICPHONE: /^[1][3,4,5,6,7,8,9]\d{9}$/, // 国内手机号
  FOREIGNPHONE: /^[0-9]{1,13}$/, // 海外手机号
  EMAIL: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,64}$/, // 邮箱格式
  ILLEGALSYMBOL: /[<>]/, // 包含非法字符 < >
  EMOJI: /[\u{1F600}-\u{1F64F}]/u, // 包含 emoji 表情
  CHAR1_64: /.{1,64}/, // 1-64 位字符
  USER_NAME: /^(?![0-9]+$)(?![_]+$)(?![0-9_]+$)[0-9A-Za-z_]{1,20}$/, // 用户名
};

/**
 * 是否符合用户名格式
 */
export function userNameCheck(param: string) {
  return regTypeEnum.USER_NAME.test(param);
}

/**
 * 是否符合国内手机号格式
 */
export function domesticPhoneCheck(param:string) {
  return regTypeEnum.DOMESTICPHONE.test(param);
}

/**
 * 是否符合海外手机号格式
 */
export function foreignPhoneCheck(param: string) {
  return regTypeEnum.FOREIGNPHONE.test(param);
}

/**
 * 是否符合邮箱号格式
 */
export function emailCheck(param:string) {
  return regTypeEnum.EMAIL.test(param);
}

/**
 * 是否不包含非法字符格式
 */
export function illegalSymbolCheck(param:string) {
  return !regTypeEnum.ILLEGALSYMBOL.test(param);
}

/**
 * 是否不包含 emoji 表情
 */
export function emojiCheck(param:string) {
  return !regTypeEnum.EMOJI.test(param);
}

/**
 * 是否符合 1-64 位字符
 */
export function char1_64(param:string) {
  return regTypeEnum.CHAR1_64.test(param);
}
