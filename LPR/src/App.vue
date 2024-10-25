<script setup lang="ts">
import { RouterView } from 'vue-router'
import {
  type IGetAllInfoResult,
  serverAddressEnum,
  lanEnum,
  hasHomeIndicatorEnum,
  AppTypeEnum,
  langTypeEnum,
} from './dsbridge/types'
import { dsbridgeFuncSync } from './dsbridge/dsbridge'
import { useAppInfoStore } from '@/stores/app-info/app-info'
// TODO: 怎么解构使用且不丢失响应式
const appInfoStore = useAppInfoStore()
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()


// TODO: 写进环境变量文件里, 并且有三个状态：全mock, 仅mock接口, 全不MOCK
const APPInfo = getAllInfo(true)
setAPPInfo(APPInfo)

function getAllInfo(isMock: boolean) {
  const mockData: IGetAllInfoResult = {
    ucsToken: '',
    serverAddress: serverAddressEnum.DOMESTIC_UCS,
    curLan: lanEnum.JAP,
    defaultLan: lanEnum.EN,
    statusBarHeight: 36,
    hasHomeIndicator: hasHomeIndicatorEnum.NO,
    AppType: AppTypeEnum.EZLIVE,
  }

  if (isMock) {
    console.log('MOCK 的数据为:%o', mockData)
    return mockData
  } else {
    const dsbridgeData = dsbridgeFuncSync.getAllInfo()
    console.log('从dsBridge获取到的数据为：%o', dsbridgeData)
    return dsbridgeData
  }
}

function setAPPInfo(APPInfo: IGetAllInfoResult) {
  // NOTE: 这个值并不是个整数，原生传过来的时候是四入五入过的
  const statusBarHeight = APPInfo.statusBarHeight - 1
  let homeIndicatorHeight = '0'
  if (APPInfo.hasHomeIndicator === hasHomeIndicatorEnum.YES) {
    homeIndicatorHeight = '21'
  }

  document.body.style.setProperty('--statusBarHeight', statusBarHeight + 'px')
  document.body.style.setProperty('--pageTitleHeight', 44 + 'px')
  document.body.style.setProperty(
    '--homeIndicatorHeight',
    homeIndicatorHeight + 'px',
  )

  // NOTE: 设置语言
  locale.value = langTypeEnum[APPInfo.curLan]

  // NOTE: 存储到 store 中
  appInfoStore.setAppInfo({
    ucsToken: APPInfo.ucsToken,
    serverAddress: APPInfo.serverAddress,
    curLan: APPInfo.curLan,
    curLanType: langTypeEnum[APPInfo.curLan],
    defaultLan: APPInfo.defaultLan,
    AppType: APPInfo.AppType,
  })
}

import {userLoginRequest} from './service/request/request';

userLoginRequest({name: 'admin', password: 'admin'})
.then((result) => {
  console.log(result);
}).catch((err) => {
console.log(err);
});
</script>

<template>
  <div class="page">
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  background-color: #f3f4f7;
  margin: {
    top: var(--statusBarHeight) !important;
    bottom: var(--homeIndicatorHeight) !important;
  }
}

.page {
  height: calc(100vh - var(--statusBarHeight) - var(--homeIndicatorHeight));
  overflow: hidden; // NOTE: 解决 margin 塌陷问题
}
</style>
