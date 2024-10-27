<template>
  <basePageTitle title="过车记录"></basePageTitle>
  <div class="">过车记录的首页</div>
  <div class="template">{{ $t('hello') }}</div>
</template>

<script lang="ts" setup>
  import { userLoginRequest } from '../../service/request/request'

  userLoginRequest({ name: 'admin', password: 'admin' }, { loading: false, toast: false })
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
</script>

<style scoped lang="scss"></style>
