<template>
  <div
    class="home-sun"
    @click="$emit('son-click')">
    home-sun
  </div>
</template>

<script lang="ts" setup>
  // import { reactive, ref } from 'vue'
  defineEmits<{
    (e: 'son-click'): void
  }>()
</script>

<style scoped lang="scss"></style>
