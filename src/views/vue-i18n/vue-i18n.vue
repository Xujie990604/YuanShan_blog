<template>
  <div class="vue-i18n">
    <h1>演示 Vue3 + i18n 的使用</h1>

    <h2>在 template 中使用全局函数 $t()</h2>
    <div class="">
      {{ $t('hello') }}
      <br />
      {{ $t('config.type') }}
    </div>

    <h2>在 script 中使用 useI18n</h2>
    <div class="">
      {{ helloText }}
    </div>

    <h2>在 ts 中使用 useI18n</h2>
    <div class="">
      {{ impText.hello }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  import impText from './index'

  const helloText = ref(t('hello'))
</script>

<style scoped lang="scss"></style>
