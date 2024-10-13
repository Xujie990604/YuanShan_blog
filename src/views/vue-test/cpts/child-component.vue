<template>
  <span class="child-component">
    {{ age }}
    <el-button @click="() => (age -= 1)">-</el-button>
    <el-button @click="() => (age += 1)">+</el-button>
  </span>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  // 默认值 18
  const age = ref(18)
</script>

<style scoped lang="scss"></style>
