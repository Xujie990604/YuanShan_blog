import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAPPInfoStore, ISetAPPInfoStore } from './types';
import { serverAddressEnum, lanEnum, AppTypeEnum, hasHomeIndicatorEnum,langTypeEnum } from '../../dsbridge/types'



/**
 * 管理APP信息
 */
export const useAppInfoStore = defineStore('appInfo', () => {
  const appInfo = ref<IAPPInfoStore>({
    ucsToken: '',
    serverAddress: serverAddressEnum.OVERSEAS_UCS,
    curLan: lanEnum.ZH,
    defaultLan: lanEnum.EN,
    curLanType: langTypeEnum[lanEnum.ZH],
    statusBarHeight: 36,
    hasHomeIndicator: hasHomeIndicatorEnum.NO,
    AppType: AppTypeEnum.EZLIVE_PRO
  })

  function setAppInfo(payload: ISetAPPInfoStore) {
    appInfo.value = { ...appInfo.value, ...payload }
  }

  return { appInfo, setAppInfo }
})
