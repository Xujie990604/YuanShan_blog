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

  // NOTE：Dsbridge Mock
  const APPInfo = getAllInfo(import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '1')
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

    document.body.style.setProperty('--status-bar-height', statusBarHeight + 'px')
    document.body.style.setProperty('--page-title-height', 44 + 'px')
    document.body.style.setProperty('--home-indicator-height', homeIndicatorHeight + 'px')

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
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .page {
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    overflow: hidden; // NOTE: 解决 margin 塌陷问题
  }
</style>
