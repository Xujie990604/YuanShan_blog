<template>
  <div class="">
    {{ store.count }}
    <button @click="store.increment()">+</button>
  </div>

  <div class="b">
    {{ hook.count }}
    <button @click="hook.increment()">+</button>
  </div>
</template>

<script lang="ts" setup>
  import { store, useHook } from './hook/use-hook'
  const hook = useHook()
</script>

<style scoped lang="scss"></style>
