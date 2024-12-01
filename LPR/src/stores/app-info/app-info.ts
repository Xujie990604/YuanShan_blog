import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAPPInfoStore, ISetAPPInfoStore } from './types'
import {
  serverAddressEnum,
  lanEnum,
  AppTypeEnum,
  hasHomeIndicatorEnum,
  langTypeEnum,
} from '../../dsbridge/types'

/**
 * 管理APP信息
 */
export const useAppInfoStore = defineStore(
  'appInfo',
  () => {
    /**
     * 通过 dsbridge 获取到的 WEB 启动信息
     */
    const appInfo = ref<IAPPInfoStore>({
      ucsToken: '',
      serverAddress: serverAddressEnum.OVERSEAS_UCS,
      curLan: lanEnum.ZH,
      defaultLan: lanEnum.EN,
      curLanType: langTypeEnum[lanEnum.ZH],
      statusBarHeight: 36,
      hasHomeIndicator: hasHomeIndicatorEnum.NO,
      AppType: AppTypeEnum.EZLIVE_PRO,
    })

    function setAppInfo(payload: ISetAPPInfoStore) {
      appInfo.value = { ...appInfo.value, ...payload }
    }

    return { appInfo, setAppInfo }
  },
  {
    persist: true,
  }
)
