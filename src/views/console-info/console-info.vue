<template>
  <div class="">日志打印</div>
</template>

<script lang="ts" setup>
  import appLog from '@/hook/appLog'
  const Log = appLog()
  Log.log('111', '111')
  Log.info('222', '222')
  Log.warn('333', '333')
  Log.error('444', '444')
</script>

<style scoped lang="scss"></style>
