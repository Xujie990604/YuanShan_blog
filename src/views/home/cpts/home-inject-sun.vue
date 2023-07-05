<template>
  <div class="home-inject-sun">
    依赖注入的孙组件
    <div
      class="content"
      @click="updateInjectCount">
      依赖注入的Count: {{ injectCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { inject } from 'vue'

  // 带有默认值的依赖注入
  const { injectCount, updateInjectCount } = inject('injectCount')
</script>

<style scoped lang="scss"></style>
