<template>
  <div
    class="home-son"
    :bar="$attrs.bar"
    @click="$emit('son-click')">
    home-son
    {{ $attrs }}
  </div>
  <homeSun :foo="$attrs.foo"></homeSun>

  <!-- <div class="a">aaa</div> -->
</template>

<script lang="ts" setup>
  import { useAttrs } from 'vue'
  import homeSun from './home-sun.vue'
  const attrs = useAttrs()
  console.log(attrs)
  // import { reactive, ref } from 'vue'
  defineEmits<{
    (e: 'son-click'): void
  }>()
</script>

<style scoped lang="scss"></style>
