<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import type { IGetAllInfo } from './dsbridge/types'
  import { hasHomeIndicatorEnum, langTypeEnum } from './dsbridge/types'
  import { dsbridgeFuncSync } from './dsbridge/dsbridge'
  import { useAppInfoStore } from '@/stores/app-info/app-info'
  const appInfoStore = useAppInfoStore()
  const { setAppInfo } = appInfoStore
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  applyTpWebApp(dsbridgeFuncSync.getAllInfo())
  dsbridgeFuncSync.dismiss()

  function applyTpWebApp(APPInfo: IGetAllInfo) {
    // NOTE: 这个值并不是个整数，原生传过来的时候是四入五入过的
    const statusBarHeight = APPInfo.statusBarHeight - 1
    let homeIndicatorHeight = '0'
    if (APPInfo.hasHomeIndicator === hasHomeIndicatorEnum.YES) {
      homeIndicatorHeight = '21'
    }

    document.body.style.setProperty('--status-bar-height', statusBarHeight + 'px')
    document.body.style.setProperty('--page-title-height', 44 + 'px')
    document.body.style.setProperty('--home-indicator-height', homeIndicatorHeight + 'px')

    locale.value = langTypeEnum[APPInfo.curLan]

    setAppInfo({
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
  <RouterView />
</template>

<style lang="scss"></style>
