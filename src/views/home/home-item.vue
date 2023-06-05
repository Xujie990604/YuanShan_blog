<template>
  <div class="my-home">Mouse Position is at : {{ x }} {{ y }}</div>
</template>

<script lang="ts" setup>
  import { useMouse } from './hooks/hook-mouse'

  // 鼠标在当前页的坐标
  const { x, y } = useMouse()
</script>

<style scoped lang="scss"></style>
