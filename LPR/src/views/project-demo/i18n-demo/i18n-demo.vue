<template>
  <basePageTitle title="多语言">
    <template #rightIcon> 右 </template>
  </basePageTitle>
  <div class="i18n-demo">
    <h2>在 template 中使用多语言</h2>
    <div class="template">{{ $t('hello') }}</div>

    <h2>在 script 中使用多语言</h2>
    <div class="script">{{ helloText }}</div>

    <h2>在 ts 中使用 多语言</h2>
    <div class="ts">{{ impText.hello }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  // 在 script 中使用多语言
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const helloText = ref(t('hello'))

  // 在 ts 中使用 多语言
  import impText from './i18n'
</script>

<style scoped lang="scss">
  .i18n-demo {
    height: calc(100% - var(--status-bar-height));
    overflow: scroll;
  }
</style>
