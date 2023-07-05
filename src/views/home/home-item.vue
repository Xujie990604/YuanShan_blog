<template>
  <!-- 分别使用三种方式来体会 普通传值，透传，依赖注入带来的好处 -->
  <div class="my-home">Mouse Position is at : {{ x }} {{ y }}</div>
  <!-- 1. props emit 的方式来实现跨层级传值，事件 -->
  <!-- 2. 透传的方式来实现跨层级传值，事件 -->
  <!-- <homeSon
    foo="foo"
    bar="bar"
    @son-click="() => console.log('item click')"></homeSon> -->

  <!-- 3. 依赖注入的方式来实现跨层级传值，事件 -->
  <homeInjectSon></homeInjectSon>
</template>

<script lang="ts" setup>
  // import homeSon from './cpts/home-son.vue'
  import { useMouse } from './hooks/hook-mouse'
  // 鼠标在当前页的坐标
  const { x, y } = useMouse()

  // 3. 依赖注入的方式来实现跨层级传值，事件
  import homeInjectSon from './cpts/home-inject-son.vue'
  import { ref, provide } from 'vue'
  const injectCount = ref(0)
  function updateInjectCount() {
    injectCount.value++
  }
  provide('injectCount', {
    injectCount,
    updateInjectCount,
  })
</script>

<style scoped lang="scss"></style>
