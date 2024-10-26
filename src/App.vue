<script setup lang="ts">
  import { inject } from 'vue'
  const zhuge = inject('zhuge') as any
  zhuge.track('用户登录')
</script>

<template>
  <RouterView></RouterView>
</template>

<style lang="scss">
  #app {
    height: 100vh;
  }
</style>
