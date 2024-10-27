<template>
  <basePageTitle title="过车记录"></basePageTitle>
  <div class="">过车记录的首页</div>
  <div class="template">{{ $t('hello') }}</div>
</template>

<script lang="ts" setup>
  import { userLoginRequest } from '../../service/request/request'

  userLoginRequest({ name: 'admin', password: 'admin' })
    .then(result => {
      console.log('接口请求成功', result)
    })
    .catch(err => {
      console.log('接口请求失败', err)
    })
</script>

<style scoped lang="scss"></style>
